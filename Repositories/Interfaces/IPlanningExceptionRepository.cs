using PlanningAndExceptionSystem.Models.CodeFirst;

namespace PlanningAndExceptionSystem.Repositories.Interfaces
{
    public interface IPlanningExceptionRepository : IGenericRepository<PlanningException>
    {
        Task CalculateExceptionsWithSpAsync();
    }
}
