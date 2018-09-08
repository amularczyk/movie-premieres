$resourceGroup = "MoviePremieres"

Import-Module AzureRM

Connect-AzureRmAccount

Remove-AzureRmResourceGroup -name $resourceGroup