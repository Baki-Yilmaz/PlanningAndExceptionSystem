using System.Linq.Expressions;

namespace PlanningAndExceptionSystem.Services.Interfaces
{
    public interface IService<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync();
        IQueryable<T> Where(Expression<Func<T, bool>> expression);
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task RemoveAsync (T entity);
    }
}