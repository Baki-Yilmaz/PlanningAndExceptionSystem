using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Models.DbFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.Json;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class ActualSalesService : Service<ActualSale>, IActualSalesService
    {
        private readonly IGenericRepository<Product> _productRepository;

        public  ActualSalesService(IGenericRepository<ActualSale> repository, IUnitofWork unitofwork, IGenericRepository<Product> productRepository)
            :base(repository, unitofwork)
        {
            _productRepository = productRepository;
        }

        public async Task<ActualSale> CreateActualSalesWithCalculationAsync(ActualSale actualSale, int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);

            if (product == null)
            {
                throw new Exception("Sistemde bu ID'ye ait bir Ürün bulunamadı!");
            }

            actualSale.ProductId = productId;
            actualSale.TotalAmount = actualSale.SoldQuantity * product.UnitPrice;
            actualSale.TotalCost = actualSale.SoldQuantity * product.CostPrice;
            actualSale.Profit = actualSale.TotalAmount - actualSale.TotalCost;

            return await AddAsync(actualSale);
        }
    }
}
