using System;

namespace MoviePremieres.Domain.Interfaces
{
    public interface ICacheDatabase : IDisposable
    {
        T Get<T>(string key);
        void Set<T>(string key, T value);
    }
}