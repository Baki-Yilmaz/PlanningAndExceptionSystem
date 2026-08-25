using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;
using PlanningAndExceptionSystem.Services.Services;

namespace PlanningAndExceptionSystem.Services
{
    public class PlanningExceptionService : Service<PlanningException>, IPlanningExceptionService
    {
        private readonly IPlanningExceptionRepository _planningexceptionrepository;

        public PlanningExceptionService(IPlanningExceptionRepository repository, IUnitofWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _planningexceptionrepository = repository;
        }

        public async Task CalculateExceptionsAsync()
        {
            await _planningexceptionrepository.CalculateExceptionsWithSpAsync();
        }
    }
}