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

#AppSettings
$appSettings = @{
	WEBSITE_NODE_DEFAULT_VERSION = '6.9.1';
	SCM_COMMAND_IDLE_TIMEOUT = '600';
	WEBJOBS_IDLE_TIMEOUT = '600';
}

#Set AppSettings
Set-AzureRmwebApp -ResourceGroupName $resourceGroup -Name $webAppName -AppSettings $appSettings

#GitHub Properties
$PropertiesObject = @{
	repoUrl = "https://github.com/amularczyk/movie-premieres.git";
	branch = "master";
}

#Deploy Web App
Set-AzureRmResource -PropertyObject $PropertiesObject -ResourceGroupName $resourceGroup -ResourceType Microsoft.Web/sites/sourcecontrols -ResourceName $webAppName/web -ApiVersion 2015-08-01 -Force