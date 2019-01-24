namespace MoviePremieres.Domain.Interfaces
{
    public interface ICacheDatabase
    {
        T Get<T>(string key);
        void Set<T>(string key, T value);
    }
}