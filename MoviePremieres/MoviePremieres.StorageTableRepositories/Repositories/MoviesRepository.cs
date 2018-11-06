using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.WindowsAzure.Storage.Table;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;
using MoviePremieres.StorageTableRepositories.Models;

namespace MoviePremieres.StorageTableRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly string _partitionKey = "movie";
        private readonly CloudTable _table;
        private readonly IMapper _mapper;

        public MoviesRepository(CloudTable table, IMapper mapper)
        {
            _table = table;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Movie>> GetAll()
        {
            var query = new TableQuery<MovieEntity>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, _partitionKey));

            var movies = new List<Movie>();

            TableContinuationToken token = null;
            do
            {
                var resultSegment = await _table.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;

                foreach (var entity in resultSegment.Results)
                {
                    movies.Add(_mapper.Map<Movie>(entity));
                }
            } while (token != null);

            return movies;
        }

        public async Task Add(Movie movie)
        {
            var movieEntity = _mapper.Map<MovieEntity>(movie);
            movieEntity.PartitionKey = _partitionKey;

            var insertOperation = TableOperation.Insert(movieEntity);

            await _table.ExecuteAsync(insertOperation);
        }

        public async Task AddMany(IEnumerable<Movie> movies)
        {
            var insertOperations = new TableBatchOperation();

            var movieEntities = _mapper.Map<IEnumerable<MovieEntity>>(movies);
            foreach (var movieEntity in movieEntities)
            {
                movieEntity.PartitionKey = _partitionKey;
                insertOperations.Add(TableOperation.Insert(movieEntity));
            }


            await _table.ExecuteBatchAsync(insertOperations);
        }

        public async Task<Movie> GetById(Guid id)
        {
            var retrieveOperation = TableOperation.Retrieve<MovieEntity>(_partitionKey, id.ToString());
            var retrievedResult = await _table.ExecuteAsync(retrieveOperation);

            return _mapper.Map<Movie>((MovieEntity) retrievedResult.Result);
        }

        public async Task Update(Movie movie)
        {
            var retrieveOperation = TableOperation.Retrieve<MovieEntity>(_partitionKey, movie.Id.ToString());
            var retrievedResult = await _table.ExecuteAsync(retrieveOperation);

            var updateEntity = (MovieEntity) retrievedResult.Result;
            if (updateEntity != null)
            {
                _mapper.Map(movie, updateEntity);

                var updateOperation = TableOperation.Replace(updateEntity);
                await _table.ExecuteAsync(updateOperation);
            }
        }
    }
}