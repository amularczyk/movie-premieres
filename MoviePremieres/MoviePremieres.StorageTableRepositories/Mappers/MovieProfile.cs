using AutoMapper;
using MoviePremieres.Domain.Models;
using MoviePremieres.StorageTableRepositories.Models;

namespace MoviePremieres.StorageTableRepositories.Mappers
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