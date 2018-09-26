using System;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace MoviePremieres.CosmosDBRepositories.Models
{
    public class MovieEntity
    {
        [BsonId(IdGenerator = typeof(CombGuidGenerator))]
        public Guid Id { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }

        [BsonElement("Premiere")]
        public DateTimeOffset Premiere { get; set; }
    }
}
