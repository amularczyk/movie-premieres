using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MoviePremieres.Domain.Configs;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Services.Interfaces;

namespace MoviePremieres.Domain.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly AppSettings _appSettings;
        private readonly ICacheDatabase _cacheDatabase;
        private readonly IMoviesRepository _moviesRepository;

        public MoviesService(
            IMoviesRepository moviesRepository,
            ICacheDatabase cacheDatabase,
            IOptions<AppSettings> appSettings)
        {
            _moviesRepository = moviesRepository;
            _cacheDatabase = cacheDatabase;
            _appSettings = appSettings.Value;
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
            var movie = GetFromCache(id);
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

        private Movie GetFromCache(Guid id)
        {
            if (!_appSettings.UseCache)
            {
                return null;
            }

            return _cacheDatabase.Get<Movie>(id.ToString());
        }

        private void UpdateCache(Guid id, Movie movie)
        {
            if (!_appSettings.UseCache)
            {
                return;
            }

            _cacheDatabase.Set(id.ToString(), movie);
        }
    }
}