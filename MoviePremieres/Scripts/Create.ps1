param (
    [string]$resourceGroup,
    [string]$location,
    [string]$login,
    [string]$password,
    [string]$serverName,
    [string]$databaseName,
    [string]$ip,
    [string]$storageAccountName,
    [string]$tableName,

    [string]$webAppNamePlan,
    [string]$webAppName
)

Import-Module AzureRM

Connect-AzureRmAccount

#Resource Group
New-AzureRmResourceGroup -Name $resourceGroup -Location $location


#Sql Server
New-AzureRmSqlServer -ResourceGroupName $resourceGroup -Location $location -ServerName $serverName -SqlAdministratorCredentials $(New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $login, $(ConvertTo-SecureString -String $password -AsPlainText -Force))

#Sql Server Firewall Rule
New-AzureRmSqlServerFirewallRule -ResourceGroupName $resourceGroup -ServerName $serverName -FirewallRuleName "AlloweMe" -StartIpAddress $ip -EndIpAddress $ip

#Sql Database
New-AzureRmSqlDatabase  -ResourceGroupName $resourceGroup -ServerName $serverName -DatabaseName $databaseName -Edition "Basic"


#Sql Storage
$storageAccount = New-AzureRmStorageAccount -ResourceGroupName $resourceGroup -Name $storageAccountName -Location $location -SkuName Standard_LRS -Kind StorageV2 -AccessTier Cool
$ctx = $storageAccount.Context

#Sql Sotrage Table - something not working here when running a whole script
New-AzureStorageTable -Context $ctx -Name $tableName


#Cosmos DB - MongoDB
$consistencyPolicy = @{"defaultConsistencyLevel"="Session"; "maxIntervalInSeconds"="5"; "maxStalenessPrefix"="100"}

$DBProperties = @{"databaseAccountOfferType"="Standard"; "consistencyPolicy"=$consistencyPolicy; "ipRangeFilter"=$ip}

New-AzureRmResource -ResourceType "Microsoft.DocumentDb/databaseAccounts" -ResourceGroupName $resourceGroup -Location $location -Name $serverName -Kind "MongoDB" -PropertyObject $DBProperties


#Deploy App
New-AzureRmAppServicePlan -Name $webAppNamePlan -Location $location -ResourceGroupName $resourceGroup -Tier Free

# Create a web app.
New-AzureRmWebApp -Name $webAppName -Location $location -AppServicePlan $webAppNamePlan -ResourceGroupName $resourceGroup


# Configure GitHub deployment to the staging slot from your GitHub repo and deploy once.
$PropertiesObject = @{
    repoUrl = "https://github.com/amularczyk/movie-premieres";
    branch = "master";
}

Set-AzureRmResource -PropertyObject $PropertiesObject -ResourceGroupName $resourceGroup -ResourceType Microsoft.Web/sites -ResourceName $webAppName -ApiVersion 2015-08-01 -Force





# Upgrade App Service plan to Standard tier (minimum required by deployment slots)
Set-AzureRmAppServicePlan -Name $webappname -ResourceGroupName myResourceGroup -Tier Standard

#Create a deployment slot with the name "staging".
New-AzureRmWebAppSlot -Name $webappname -ResourceGroupName myResourceGroup -Slot staging



# Swap the verified/warmed up staging slot into production.
Switch-AzureRmWebAppSlot -Name $webAppName -ResourceGroupName myResourceGroup -SourceSlotName staging -DestinationSlotName production