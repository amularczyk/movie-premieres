using System;
using System.Collections.Generic;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.Repositories.List
{
    public class MoviesRepository : IMoviesRepository
    {
        public IEnumerable<Movie> GetAll()
        {
            return ListDatabase.Movies;
        }

        public void Create(Movie movie)
        {
            ListDatabase.Movies.Add(movie);
        }
    }

    public static class ListDatabase
    {
        public static List<Movie> Movies { get; } = new List<Movie>() { new Movie { Title = "movie 1", Premiere = DateTimeOffset.Now }};
    }
}