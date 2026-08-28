using PlanningAndExceptionSystem.Models;
using PlanningAndExceptionSystem.Models.CodeFirst;

namespace PlanningAndExceptionSystem.Services.Interfaces
{
    public interface IActualSalesService : IService<ActualSale>
    {
        Task<ActualSale> CreateActualSalesWithCalculationAsync(ActualSale actual, int productId);
    }
}