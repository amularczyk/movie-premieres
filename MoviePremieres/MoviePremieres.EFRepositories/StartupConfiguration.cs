using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.Domain.Repositories;
using MoviePremieres.EFRepositories.List;

namespace MoviePremieres.EFRepositories
{
    public static class StartupConfiguration
    {
        // ReSharper disable once InconsistentNaming
        public static void RegisterEFRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IMoviesRepository, MoviesRepository>();

            var connectionString = configuration.GetConnectionString("AzureConnection");

            services
                .AddEntityFrameworkSqlServer()
                .AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));
        }
    }
}