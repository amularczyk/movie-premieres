using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;

namespace MoviePremieres.Domain
{
    public static class DataInitializer
    {
        public static void SeedData(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                var movieRepository = serviceScope.ServiceProvider.GetService<IMoviesRepository>();
                movieRepository.AddMany(Movies);
            }
        }

        public static List<Movie> Movies = new List<Movie>
        {
            new Movie
            {
                Id = Guid.NewGuid(),
                Title = "Captain Marvel",
                PremiereDate = new DateTimeOffset(new DateTime(2019, 3, 8, 0, 0, 0, DateTimeKind.Utc)),
                FilmwebUrl = "https://www.filmweb.pl/film/Kapitan+Marvel-2019-726490",
                ImageUrl =
                    "https://gfx.antyradio.pl/var/antyradio/storage/images/film/news/zobacz-grafike-koncepcyjna-przeciwnikow-captain-marvel-16553/1131906-1-pol-PL/Zobacz-grafike-koncepcyjna-przeciwnikow-Captain-Marvel_article.jpg"
            },
            new Movie
            {
                Id = Guid.NewGuid(),
                Title = "Venom",
                PremiereDate = new DateTimeOffset(new DateTime(2018, 10, 5, 0, 0, 0, DateTimeKind.Utc)),
                FilmwebUrl = "https://www.filmweb.pl/film/Venom-2018-519906",
                ImageUrl = "https://1.fwcdn.pl/po/99/06/519906/7857303.3.jpg"
            }
        };
    }
}