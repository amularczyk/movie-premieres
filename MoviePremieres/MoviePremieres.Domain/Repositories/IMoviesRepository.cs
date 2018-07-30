using System.Collections.Generic;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.Domain.Repositories
{
    public interface IMoviesRepository
    {
        IEnumerable<Movie> GetAll();
        void Create(Movie movie);
    }
}