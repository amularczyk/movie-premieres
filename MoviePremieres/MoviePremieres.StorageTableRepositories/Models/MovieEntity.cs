using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace MoviePremieres.StorageTableRepositories.Models
{
    public class MovieEntity : TableEntity
    {
        public string Title { get; set; }
        public DateTimeOffset PremiereDate { get; set; }
        public string ImageUrl { get; set; }
        public string FilmwebUrl { get; set; }
    }
}