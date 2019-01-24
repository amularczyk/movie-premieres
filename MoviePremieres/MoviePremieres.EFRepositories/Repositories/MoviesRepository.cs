using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.Domain.Models;

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

        public Task AddMany(IEnumerable<Movie> movies)
        {
            _dbContext.Movies.AddRange(movies);

            _dbContext.SaveChanges();

            return Task.CompletedTask;
        }

        public async Task<Movie> GetById(Guid id)
        {
            return await _dbContext.Movies.FindAsync(id);
        }

        public async Task Update(Movie movie)
        {
            _dbContext.Movies.Update(movie);
            await _dbContext.SaveChangesAsync();
        }
    }
}