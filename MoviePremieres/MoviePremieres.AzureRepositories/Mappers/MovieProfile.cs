using AutoMapper;
using MoviePremieres.AzureRepositories.Models;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.AzureRepositories.Mappers
{
    public class MovieProfile : Profile
    {
        public MovieProfile()
        {
            CreateMap<Movie, MovieEntity>()
                .ForMember(dest => dest.RowKey, opt => opt.MapFrom(src => src.Id.ToString()));

            CreateMap<MovieEntity, Movie>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => int.Parse(src.RowKey)));
        }
    }
}