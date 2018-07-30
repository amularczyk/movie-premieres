using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.Controllers
{
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly IMoviesService _moviesService;

        public MoviesController(IMoviesService moviesService)
        {
            _moviesService = moviesService;
        }

        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return _moviesService.GetAll();
        }

        [HttpPost]
        public void Post([FromBody] Movie movie)
        {
            _moviesService.Add(movie);
        }
    }
}