using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class PlanningWeekService : Service<PlanningWeek>, IPlanningWeekService
    {
        public PlanningWeekService(IGenericRepository<PlanningWeek> repository, IUnitofWork unitOfWork) 
            : base(repository, unitOfWork) {}
    }
}