using System.Collections.Generic;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.Domain.Interfaces
{
    public interface IMoviesService
    {
        IEnumerable<Movie> GetAll();
        void Add(Movie movie);
    }
}