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

        public Task Add(Movie movie)
        {
            movie.Id = Guid.NewGuid();
            ListDatabase.Movies.Add(movie);
            return Task.CompletedTask;
        }

        public Task AddMany(IEnumerable<Movie> movies)
        {
            ListDatabase.Movies.AddRange(movies);
            return Task.CompletedTask;
        }

        public Task<Movie> GetById(Guid id)
        {
            return Task.FromResult(ListDatabase.Movies.FirstOrDefault(m => m.Id == id));
        }

        public Task Update(Movie movie)
        {
            var movieToDelete = ListDatabase.Movies.FirstOrDefault(m => m.Id == movie.Id);
            ListDatabase.Movies.Remove(movieToDelete);
            ListDatabase.Movies.Add(movie);
            return Task.CompletedTask;
        }
    }

    public static class ListDatabase
    {
        public static List<Movie> Movies { get; } = new List<Movie>();
    }
}