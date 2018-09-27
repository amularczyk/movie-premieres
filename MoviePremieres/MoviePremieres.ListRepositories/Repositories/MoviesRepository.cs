using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.ListRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        public Task<IEnumerable<Movie>> GetAll()
        {
            return Task.FromResult(ListDatabase.Movies.AsEnumerable());
        }

        public Task Create(Movie movie)
        {
            ListDatabase.Movies.Add(movie);
            return Task.CompletedTask;
        }
    }

    public static class ListDatabase
    {
        public static List<Movie> Movies { get; } =
            new List<Movie> {new Movie {Title = "movie 1", PremiereDate = DateTimeOffset.Now}};
    }
}