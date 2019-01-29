using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.Domain.Configs;
using MoviePremieres.Domain.Services;
using MoviePremieres.Domain.Services.Interfaces;

namespace MoviePremieres.Domain
{
    public static class StartupConfiguration
    {
        public static void RegisterDomainServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IMoviesService, MoviesService>();

            services.Configure<AppSettings>(configuration.GetSection("AppSettings"));
        }
    }
}