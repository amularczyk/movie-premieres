using System.Collections.Generic;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.AzureRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        public MoviesRepository()
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(StartupConfiguration.AzureStorageConnection);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            CloudTable table = tableClient.GetTableReference("moviepremieres");
        }

        public IEnumerable<Movie> GetAll()
        {
            return null;
        }

        public void Create(Movie movie)
        {
        }
    }
}