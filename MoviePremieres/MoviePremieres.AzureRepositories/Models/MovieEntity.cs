using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace MoviePremieres.AzureRepositories.Models
{
    public class MovieEntity : TableEntity
    {
        public string Title { get; set; }
        public DateTimeOffset Premiere { get; set; }
    }
}