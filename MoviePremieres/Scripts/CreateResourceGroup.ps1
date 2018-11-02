param (
    [string]$resourceGroup,
    [string]$location
)

#Resource Group
New-AzureRmResourceGroup -Name $resourceGroup -Location $location