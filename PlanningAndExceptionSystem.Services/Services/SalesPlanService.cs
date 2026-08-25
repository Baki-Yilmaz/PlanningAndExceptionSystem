using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class SalesPlanService : Service<SalesPlan>, ISalesPlanService
    {
        public SalesPlanService(IGenericRepository<SalesPlan> repository, IUnitofWork unitOfWork    ) :
            base(repository, unitOfWork) { }
    }
}