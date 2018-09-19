using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<IEnumerable<Movie>> Get()
        {
            return await _moviesService.GetAll();
        }

        [HttpPost]
        public async Task Post([FromBody] Movie movie)
        {
            await _moviesService.Add(movie);
        }
    }
}