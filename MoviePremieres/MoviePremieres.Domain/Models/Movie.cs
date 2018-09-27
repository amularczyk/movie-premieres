using System;

namespace MoviePremieres.Domain.Models
{
    public class Movie
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTimeOffset PremiereDate { get; set; }
        public string ImageUrl { get; set; }
        public string FilmwebUrl { get; set; }
    }
}