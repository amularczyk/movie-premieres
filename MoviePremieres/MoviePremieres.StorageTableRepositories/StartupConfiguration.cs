using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.WindowsAzure.Storage;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.StorageTableRepositories.Repositories;

namespace MoviePremieres.StorageTableRepositories
{
    public static class StartupConfiguration
    {
        public static void RegisterAzureStorageRepositories(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IMoviesRepository, MoviesRepository>();

            var azureStorageConnection = configuration.GetConnectionString("AzureStorageConnection");

            services.AddScoped(_ =>
            {
                var storageAccount = CloudStorageAccount.Parse(azureStorageConnection);
                var tableClient = storageAccount.CreateCloudTableClient();
                return tableClient.GetTableReference("moviepremieres");
            });
        }
    }
}