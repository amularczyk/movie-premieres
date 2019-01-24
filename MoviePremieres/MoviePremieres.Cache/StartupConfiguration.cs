using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.Domain.Interfaces;
using StackExchange.Redis;

namespace MoviePremieres.Cache
{
    public static class StartupConfiguration
    {
        public static void RegisterAzureRedisCache(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<ICacheDatabase, CacheDatabase>();

            var cacheConnection = configuration.GetConnectionString("RedisCacheConnection");
            services.AddScoped(_ => ConnectionMultiplexer.Connect(cacheConnection));
        }
    }
}