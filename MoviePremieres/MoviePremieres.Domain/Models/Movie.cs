using System;

namespace MoviePremieres.Domain.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTimeOffset Premiere { get; set; }
    }
}