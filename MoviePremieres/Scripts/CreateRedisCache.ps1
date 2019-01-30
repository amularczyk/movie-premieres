param (
    [string]$resourceGroup,
    [string]$location,
    [string]$redisCacheName
)

#Redis Cache
New-AzureRmRedisCache -ResourceGroupName $resourceGroup -Name $redisCacheName -Location $location -Sku Basic -Size 250MB