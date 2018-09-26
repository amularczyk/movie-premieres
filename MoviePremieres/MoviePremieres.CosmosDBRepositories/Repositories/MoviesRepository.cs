using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using MoviePremieres.CosmosDBRepositories.Models;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.CosmosDBRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly MongoClient _mongoClient;

        public MoviesRepository(MongoClient mongoClient)
        {
            _mongoClient = mongoClient;
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
            var dbName = "moviepremieres";
            var collectionName = "moviepremieres";

            var database = _mongoClient.GetDatabase(dbName);
            var collection = database.GetCollection<MovieEntity>(collectionName);
            return collection;
        }
    }
}