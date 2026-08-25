using PlanningAndExceptionSystem.Models.CodeFirst;

namespace PlanningAndExceptionSystem.Services.Interfaces
{
    public interface IPlanningExceptionService : IService<PlanningException>
    {
        Task CalculateExceptionsAsync();
    }
}