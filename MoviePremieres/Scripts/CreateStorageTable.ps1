param (
    [string]$resourceGroup,
    [string]$location,
    [string]$storageAccountName,
    [string]$tableName
)

#Sql Storage
$storageAccount = New-AzureRmStorageAccount -ResourceGroupName $resourceGroup -Name $storageAccountName -Location $location -SkuName Standard_LRS -Kind StorageV2 -AccessTier Cool
$ctx = $storageAccount.Context

#Sql Sotrage Table
New-AzureStorageTable -Context $ctx -Name $tableName