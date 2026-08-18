using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class SeasonService : Service<Season>, ISeasonService
    {
        public SeasonService(IGenericRepository<Season> repository, IUnitofWork unitofWork) : 
            base(repository, unitofWork) { }
    }
}