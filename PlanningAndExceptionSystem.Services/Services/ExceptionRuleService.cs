
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class ExceptionRuleService : Service<ExceptionRule>, IExceptionRuleService
    {
        public ExceptionRuleService(IGenericRepository<ExceptionRule> repository, IUnitofWork unitofWork)
            : base(repository, unitofWork) { }
    }
}
