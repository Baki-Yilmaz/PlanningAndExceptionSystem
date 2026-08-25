using Microsoft.EntityFrameworkCore;
using PlanningAndExceptionSystem.Models.DbFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class InventoryService : Service<Inventory>, IInventoryService
    {
        private readonly IGenericRepository<Inventory> _repository;
        private readonly IUnitofWork _unitOfWork;

        public InventoryService(IGenericRepository<Inventory> repository, IUnitofWork unitOfWork) : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public override async Task<Inventory> AddAsync(Inventory entity)
        {
            var existingInventory = await _repository
                .Where(i => i.ShopId == entity.ShopId && i.ProductId == entity.ProductId)
                .FirstOrDefaultAsync();

            if (existingInventory != null)
            {
                existingInventory.Quantity += entity.Quantity;
                existingInventory.UpdatedDate = DateTime.Now;
                _repository.Update(existingInventory);
                await _unitOfWork.CommitAsync();
                return existingInventory;
            }
            else
            {
                entity.CreatedDate = DateTime.Now;
                entity.UpdatedDate = DateTime.Now;
                return await base.AddAsync(entity);
            }
        }
    }
}