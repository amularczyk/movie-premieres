using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.Domain.Repositories
{
    public interface IMoviesRepository
    {
        Task<IEnumerable<Movie>> GetAll();
        Task Add(Movie movie);
        Task Add(IEnumerable<Movie> movies);
        Task<Movie> GetById(Guid id);
    }
}