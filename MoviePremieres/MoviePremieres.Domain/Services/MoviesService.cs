using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Services.Interfaces;

namespace MoviePremieres.Domain.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly ICacheDatabase _cacheDatabase;
        private readonly IMoviesRepository _moviesRepository;

        public MoviesService(
            IMoviesRepository moviesRepository,
            ICacheDatabase cacheDatabase)
        {
            _moviesRepository = moviesRepository;
            _cacheDatabase = cacheDatabase;
        }

        public async Task<IEnumerable<Movie>> GetAll()
        {
            return await _moviesRepository.GetAll();
        }

        public async Task Add(Movie movie)
        {
            await _moviesRepository.Add(movie);
            UpdateCache(movie.Id, movie);
        }

        public async Task<Movie> GetById(Guid id)
        {
            var movie = _cacheDatabase.Get<Movie>(id.ToString());
            if (movie != null)
            {
                return movie;
            }

            movie = await _moviesRepository.GetById(id);
            UpdateCache(id, movie);

            return movie;
        }

        public async Task Update(Movie movie)
        {
            await _moviesRepository.Update(movie);
            UpdateCache(movie.Id, movie);
        }

        private void UpdateCache(Guid id, Movie movie)
        {
            _cacheDatabase.Set(id.ToString(), movie);
        }
    }
}