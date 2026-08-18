using PlanningAndExceptionSystem.Models;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Interfaces
{
    public interface IActualSalesService : IService<ActualSale>
    {
        Task<ActualSale> CreateActualSalesWithCalculationAsync(ActualSale actual, int productId);
    }
}