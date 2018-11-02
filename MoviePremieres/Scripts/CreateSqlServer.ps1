param (
    [string]$resourceGroup,
    [string]$location,
    [string]$login,
    [string]$password,
    [string]$serverName,
    [string]$databaseName,
    [string]$ip
)

#Sql Server
New-AzureRmSqlServer -ResourceGroupName $resourceGroup -Location $location -ServerName $serverName -SqlAdministratorCredentials $(New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $login, $(ConvertTo-SecureString -String $password -AsPlainText -Force))

#Sql Server Firewall Rule
New-AzureRmSqlServerFirewallRule -ResourceGroupName $resourceGroup -ServerName $serverName -FirewallRuleName "AlloweMe" -StartIpAddress $ip -EndIpAddress $ip

#Sql Database
New-AzureRmSqlDatabase  -ResourceGroupName $resourceGroup -ServerName $serverName -DatabaseName $databaseName -Edition "Basic"