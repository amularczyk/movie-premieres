using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
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

            var host = "";
            var dbName = "";
            var userName = "";
            var password = "";
            var azureStorageConnection = configuration.GetConnectionString("AzureCosmosDBConnection");

            services.AddScoped(_ =>
                {
                    //var settings = new MongoClientSettings
                    //{
                    //    Server = new MongoServerAddress(host, 10255),
                    //    UseSsl = true,
                    //    SslSettings = new SslSettings {EnabledSslProtocols = SslProtocols.Tls12}
                    //};

                    //MongoIdentity identity = new MongoInternalIdentity(dbName, userName);
                    //MongoIdentityEvidence evidence = new PasswordEvidence(password);

                    //settings.Credential = new MongoCredential("SCRAM-SHA-1", identity, evidence);

                    return new MongoClient(azureStorageConnection);
                }
            );
        }
    }
}