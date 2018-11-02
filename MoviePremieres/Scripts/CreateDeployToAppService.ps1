param (
    [string]$resourceGroup,
    [string]$location,
    [string]$webAppName,
    [string]$webAppNamePlan
)

#AppService Plan
New-AzureRmAppServicePlan -Name $webAppNamePlan -Location $location -ResourceGroupName $resourceGroup -Tier Free

#Web App
New-AzureRmWebApp -Name $webAppName -Location $location -AppServicePlan $webAppNamePlan -ResourceGroupName $resourceGroup

#GitHub Properties
$PropertiesObject = @{
    repoUrl = "https://github.com/amularczyk/movie-premieres.git";
    branch = "master";
}

#Deploy Web App
Set-AzureRmResource -PropertyObject $PropertiesObject -ResourceGroupName $resourceGroup -ResourceType Microsoft.Web/sites/sourcecontrols -ResourceName $webAppName/web -ApiVersion 2015-08-01 -Force