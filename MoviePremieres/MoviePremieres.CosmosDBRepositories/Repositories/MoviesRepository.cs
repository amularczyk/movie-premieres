using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using MoviePremieres.CosmosDBRepositories.Configs;
using MoviePremieres.CosmosDBRepositories.Models;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.CosmosDBRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly MongoClient _mongoClient;
        private readonly AzureCosmosDbConfig _azureCosmosDbConfig;
        private readonly string _collectionName = "Movies";

        public MoviesRepository(MongoClient mongoClient, AzureCosmosDbConfig azureCosmosDbConfig)
        {
            _mongoClient = mongoClient;
            _azureCosmosDbConfig = azureCosmosDbConfig;
        }

        public Task<IEnumerable<Movie>> GetAll()
        {
            var collection = GetCollection();
            var movieEntities = collection.Find(new BsonDocument()).ToList();

            var movies = Mapper.Map<IEnumerable<Movie>>(movieEntities);
            return Task.FromResult(movies);
        }

        public Task Create(Movie movie)
        {
            var movieEntity = Mapper.Map<MovieEntity>(movie);

            var collection = GetCollection();
            collection.InsertOne(movieEntity);

            return Task.CompletedTask;
        }

        private IMongoCollection<MovieEntity> GetCollection()
        {
            var database = _mongoClient.GetDatabase(_azureCosmosDbConfig.DbName);
            var collection = database.GetCollection<MovieEntity>(_collectionName);
            return collection;
        }
    }
}