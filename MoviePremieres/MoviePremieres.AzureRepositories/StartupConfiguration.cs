using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.WindowsAzure.Storage;
using MoviePremieres.AzureRepositories.Repositories;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.AzureRepositories
{
    public static class StartupConfiguration
    {
        public static void RegisterAzureStorageRepositories(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IMoviesRepository, MoviesRepository>();

            var azureStorageConnection = configuration.GetConnectionString("AzureStorageConnection");
            var storageAccount = CloudStorageAccount.Parse(azureStorageConnection);
            var tableClient = storageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference("moviepremieres");

            table.CreateIfNotExistsAsync();

            services.AddSingleton(_ => table);
        }
    }
}