using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using MoviePremieres.AzureRepositories.Models;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.AzureRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly CloudTable _table;

        public MoviesRepository()
        {
            var storageAccount = CloudStorageAccount.Parse(StartupConfiguration.AzureStorageConnection);
            var tableClient = storageAccount.CreateCloudTableClient();
            _table = tableClient.GetTableReference("moviepremieres");
        }

        public async Task<IEnumerable<Movie>> GetAll()
        {
            var query = new TableQuery<MovieEntity>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "movie"));


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

        public async Task Create(Movie movie)
        {
            var movieEntity = Mapper.Map<MovieEntity>(movie);
            movieEntity.PartitionKey = "movie";

            var insertOperation = TableOperation.Insert(movieEntity);

            await _table.ExecuteAsync(insertOperation);
        }
    }
}