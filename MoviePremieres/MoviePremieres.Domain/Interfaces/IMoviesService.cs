using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.Domain.Interfaces
{
    public interface IMoviesService
    {
        Task<IEnumerable<Movie>> GetAll();
        Task Add(Movie movie);
        Task<Movie> GetById(Guid id);
        Task Update(Movie movie);
    }
}