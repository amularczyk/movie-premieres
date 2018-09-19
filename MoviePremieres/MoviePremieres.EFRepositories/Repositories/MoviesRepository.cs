using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public Task<IEnumerable<Movie>> GetAll()
        {
            return Task.FromResult(_dbContext.Movies.ToList().AsEnumerable());
        }

        public Task Create(Movie movie)
        {
            _dbContext.Movies.Add(movie);
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }
    }
}