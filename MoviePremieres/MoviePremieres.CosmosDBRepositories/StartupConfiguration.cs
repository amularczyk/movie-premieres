using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using MoviePremieres.CosmosDBRepositories.Configs;
using MoviePremieres.CosmosDBRepositories.Repositories;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.CosmosDBRepositories
{
    public static class StartupConfiguration
    {
        public static void RegisterAzureCosmosDBRepositories(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IMoviesRepository, MoviesRepository>();

            var azureStorageConnection = configuration.GetConnectionString("AzureCosmosDBConnection");
            services.AddScoped(_ => new MongoClient(azureStorageConnection));

            services.Configure<AzureCosmosDbConfig>(configuration.GetSection("AzureCosmosDbConfig"));
        }
    }
}