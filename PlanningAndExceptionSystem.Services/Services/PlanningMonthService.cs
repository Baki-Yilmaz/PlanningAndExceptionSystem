using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class PlanningMonthService : Service<PlanningMonths>, IPlanningMonthService
    {
        public PlanningMonthService(IGenericRepository<PlanningMonths> repository, IUnitofWork unitOfWork)
            : base(repository, unitOfWork) {}
    }
}