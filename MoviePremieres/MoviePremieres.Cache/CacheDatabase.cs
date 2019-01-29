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
            var value = default(T);
            var cache = _connectionMultiplexer.GetDatabase();

            var cachedValue = cache.StringGet(key);
            if (cachedValue.HasValue)
            {
                value = JsonConvert.DeserializeObject<T>(cachedValue);
            }

            return value;
        }

        public void Set<T>(string key, T value)
        {
            var cache = _connectionMultiplexer.GetDatabase();

            cache.StringSet(key, JsonConvert.SerializeObject(value));
        }

        public void Dispose()
        {
            _connectionMultiplexer.Dispose();
        }
    }
}