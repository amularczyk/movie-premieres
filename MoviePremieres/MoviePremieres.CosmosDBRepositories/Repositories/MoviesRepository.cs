using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MoviePremieres.CosmosDBRepositories.Configs;
using MoviePremieres.CosmosDBRepositories.Models;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.CosmosDBRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly AzureCosmosDbSettings _azureCosmosDbSettings;
        private readonly string _collectionName = "Movies";
        private readonly IMapper _mapper;
        private readonly MongoClient _mongoClient;

        public MoviesRepository(
            MongoClient mongoClient,
            IOptions<AzureCosmosDbSettings> azureCosmosDbSettings,
            IMapper mapper
        )
        {
            _mongoClient = mongoClient;
            _mapper = mapper;
            _azureCosmosDbSettings = azureCosmosDbSettings.Value;
        }

        public async Task<IEnumerable<Movie>> GetAll()
        {
            var collection = GetCollection();
            var movieEntities = (await collection.FindAsync(new BsonDocument())).ToList();

            var movies = _mapper.Map<IEnumerable<Movie>>(movieEntities);
            return movies;
        }

        public async Task Add(Movie movie)
        {
            var movieEntity = _mapper.Map<MovieEntity>(movie);

            var collection = GetCollection();
            await collection.InsertOneAsync(movieEntity);
        }

        public async Task AddMany(IEnumerable<Movie> movies)
        {
            var movieEntities = _mapper.Map<IEnumerable<MovieEntity>>(movies);

            var collection = GetCollection();
            await collection.InsertManyAsync(movieEntities);
        }

        public async Task<Movie> GetById(Guid id)
        {
            var collection = GetCollection();
            var movieEntity = (await collection.FindAsync(e => e.Id == id)).FirstOrDefault();

            var movie = _mapper.Map<Movie>(movieEntity);
            return movie;
        }

        public async Task Update(Movie movie)
        {
            var movieEntity = _mapper.Map<MovieEntity>(movie);

            var collection = GetCollection();
            await collection.FindOneAndReplaceAsync(e => e.Id == movie.Id, movieEntity);
        }

        private IMongoCollection<MovieEntity> GetCollection()
        {
            var database = _mongoClient.GetDatabase(_azureCosmosDbSettings.DbName);
            var collection = database.GetCollection<MovieEntity>(_collectionName);
            return collection;
        }
    }
}