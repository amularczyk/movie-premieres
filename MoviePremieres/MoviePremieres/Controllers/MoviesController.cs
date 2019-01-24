using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Services.Interfaces;

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

        [HttpGet]
        [Route("{id}")]
        public async Task<Movie> Get(Guid id)
        {
            return await _moviesService.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody] Movie movie)
        {
            await _moviesService.Add(movie);
        }

        [HttpPut]
        public async Task Put([FromBody] Movie movie)
        {
            await _moviesService.Update(movie);
        }
    }
}