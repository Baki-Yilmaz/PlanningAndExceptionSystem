using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class CountryService : Service<Country>, ICountryService
    {
        public CountryService(IGenericRepository<Country> repository, IUnitofWork unitofWork) :
            base(repository, unitofWork) { }
    }
}