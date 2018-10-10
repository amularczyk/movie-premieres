using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.Domain.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly IMoviesRepository _moviesRepository;

        public MoviesService(IMoviesRepository moviesRepository)
        {
            _moviesRepository = moviesRepository;
        }

        public async Task<IEnumerable<Movie>> GetAll()
        {
            return await _moviesRepository.GetAll();
        }

        public async Task Add(Movie movie)
        {
            await _moviesRepository.Add(movie);
        }

        public async Task<Movie> GetById(Guid id)
        {
            return await _moviesRepository.GetById(id);
        }
    }
}