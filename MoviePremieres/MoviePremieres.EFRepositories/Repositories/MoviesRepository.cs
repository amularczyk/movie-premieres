using System.Collections.Generic;
using System.Linq;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.EFRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly DataContext _dbContext;

        public MoviesRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Movie> GetAll()
        {
            return _dbContext.Movies.ToList();
        }

        public void Create(Movie movie)
        {
            _dbContext.Movies.Add(movie);
            _dbContext.SaveChanges();
        }
    }
}