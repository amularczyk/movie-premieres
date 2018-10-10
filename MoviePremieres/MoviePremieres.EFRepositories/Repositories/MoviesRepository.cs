using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<Movie>> GetAll()
        {
            var movies = await _dbContext.Movies.ToListAsync();
            return movies.AsEnumerable();
        }

        public async Task Add(Movie movie)
        {
            await _dbContext.Movies.AddAsync(movie);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Add(IEnumerable<Movie> movies)
        {
            await _dbContext.Movies.AddRangeAsync(movies);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Movie> GetById(Guid id)
        {
            return await _dbContext.Movies.FindAsync(id);
        }
    }
}