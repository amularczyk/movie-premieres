param (
    [string]$resourceGroup,
    [string]$location,
    [string]$serverName
)

#Consistency Policy
$consistencyPolicy = @{"defaultConsistencyLevel"="Session"; "maxIntervalInSeconds"="5"; "maxStalenessPrefix"="100"}

#DB Properties
$DBProperties = @{"databaseAccountOfferType"="Standard"; "consistencyPolicy"=$consistencyPolicy; "ipRangeFilter"=$ip}

#Cosmos DB - MongoDB
New-AzureRmResource -ResourceType "Microsoft.DocumentDb/databaseAccounts" -ResourceGroupName $resourceGroup -Location $location -Name $serverName -Kind "MongoDB" -PropertyObject $DBProperties