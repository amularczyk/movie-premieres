param (
	[string]$resourceGroup,
	[string]$location,
	[string]$login,
	[string]$password,
	[string]$serverName,
	[string]$databaseName,
	[string]$ip
)

Import-Module AzureRM

Connect-AzureRmAccount

New-AzureRmResourceGroup -Name $resourceGroup -Location $location

New-AzureRmSqlServer -ResourceGroupName $resourceGroup -Location $location -ServerName $serverName -SqlAdministratorCredentials $(New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $login, $(ConvertTo-SecureString -String $password -AsPlainText -Force))

New-AzureRmSqlServerFirewallRule -ResourceGroupName $resourceGroup -ServerName $serverName -FirewallRuleName "AlloweMe" -StartIpAddress $ip -EndIpAddress $ip

New-AzureRmSqlDatabase  -ResourceGroupName $resourceGroup -ServerName $serverName -DatabaseName $databaseName -Edition "Basic"