using Microsoft.EntityFrameworkCore;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.EFRepositories
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected DataContext()
        {
        }

        public DbSet<Movie> Movies { get; set; }
    }
}