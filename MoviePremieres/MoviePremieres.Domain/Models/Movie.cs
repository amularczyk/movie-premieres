using System;

namespace MoviePremieres.Domain.Models
{
    public class Movie
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTimeOffset Premiere { get; set; }
    }
}