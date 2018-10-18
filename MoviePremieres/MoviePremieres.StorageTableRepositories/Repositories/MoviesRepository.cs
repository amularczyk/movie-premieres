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

        public MoviesRepository(CloudTable table)
        {
            _table = table;
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
                    movies.Add(Mapper.Map<Movie>(entity));
                }
            } while (token != null);

            return movies;
        }

        public async Task Add(Movie movie)
        {
            var movieEntity = Mapper.Map<MovieEntity>(movie);
            movieEntity.PartitionKey = _partitionKey;

            var insertOperation = TableOperation.Insert(movieEntity);

            await _table.ExecuteAsync(insertOperation);
        }

        public async Task AddMany(IEnumerable<Movie> movies)
        {
            try
            {
                var insertOperations = new TableBatchOperation();

                var movieEntities = Mapper.Map<IEnumerable<MovieEntity>>(movies);
                foreach (var movieEntity in movieEntities)
                {
                    movieEntity.PartitionKey = _partitionKey;
                    insertOperations.Add(TableOperation.Insert(movieEntity));
                }


                await _table.ExecuteBatchAsync(insertOperations);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Movie> GetById(Guid id)
        {
            var retrieveOperation = TableOperation.Retrieve<MovieEntity>(_partitionKey, id.ToString());
            var retrievedResult = await _table.ExecuteAsync(retrieveOperation);

            return Mapper.Map<Movie>((MovieEntity) retrievedResult.Result);
        }

        public async Task Update(Movie movie)
        {
            var retrieveOperation = TableOperation.Retrieve<MovieEntity>(_partitionKey, movie.Id.ToString());
            var retrievedResult = await _table.ExecuteAsync(retrieveOperation);

            var updateEntity = (MovieEntity)retrievedResult.Result;
            if (updateEntity != null)
            {
                Mapper.Map(movie, updateEntity);

                var updateOperation = TableOperation.Replace(updateEntity);
                await _table.ExecuteAsync(updateOperation);
            }
        }
    }
}