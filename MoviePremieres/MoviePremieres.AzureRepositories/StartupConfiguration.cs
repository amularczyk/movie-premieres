using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.AzureRepositories.Repositories;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.AzureRepositories
{
    public static class StartupConfiguration
    {
        public static string AzureStorageConnection { get; set; }

        public static void RegisterAzureStorageRepositories(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IMoviesRepository, MoviesRepository>();

            AzureStorageConnection = configuration.GetConnectionString("AzureStorageConnection");
        }
    }
}