using MoviePremieres.Domain.Interfaces;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace MoviePremieres.Cache
{
    public class CacheDatabase : ICacheDatabase
    {
        private readonly ConnectionMultiplexer _connectionMultiplexer;

        public CacheDatabase(ConnectionMultiplexer connectionMultiplexer)
        {
            _connectionMultiplexer = connectionMultiplexer;
        }

        public T Get<T>(string key)
        {
            var cache = _connectionMultiplexer.GetDatabase();

            var value = JsonConvert.DeserializeObject<T>(cache.StringGet(key));

            _connectionMultiplexer.Dispose();

            return value;
        }

        public void Set<T>(string key, T value)
        {
            var cache = _connectionMultiplexer.GetDatabase();

            cache.StringSet(key, JsonConvert.SerializeObject(value));

            _connectionMultiplexer.Dispose();
        }
    }
}