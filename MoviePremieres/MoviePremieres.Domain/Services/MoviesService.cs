using System;
using System.Collections.Generic;
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

        public IEnumerable<Movie> GetAll()
        {
            return _moviesRepository.GetAll();
        }

        public void Add(Movie movie)
        {
            movie.Premiere = DateTimeOffset.Now;
            _moviesRepository.Create(movie);
        }
    }
}