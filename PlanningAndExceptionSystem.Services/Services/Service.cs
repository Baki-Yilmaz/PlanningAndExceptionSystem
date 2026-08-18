using Microsoft.EntityFrameworkCore;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;
using System.Linq.Expressions;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class Service<T> : IService<T> where T : class 
    {
        protected readonly IGenericRepository<T> _repository;
        protected readonly IUnitofWork _unitOfWork;

        public Service(IGenericRepository<T> repository, IUnitofWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _repository.GetAll().ToListAsync();
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> expression)
        {
            return _repository.Where(expression);
        }

        public async Task<T> AddAsync(T entity)
        {
            await _repository.AddAsync(entity);
            await _unitOfWork.CommitAsync();
            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            _repository.Update(entity);
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            _repository.Remove(entity);
            await _unitOfWork.CommitAsync();
        }
    }
}