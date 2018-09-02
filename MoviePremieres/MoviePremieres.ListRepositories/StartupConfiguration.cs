using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.Domain.Repositories;
using MoviePremieres.ListRepositories.List;

namespace MoviePremieres.ListRepositories
{
    public static class StartupConfiguration
    {
        public static void RegisterListRepositories(this IServiceCollection services)
        {
            services.AddTransient<IMoviesRepository, MoviesRepository>();
        }
    }
}