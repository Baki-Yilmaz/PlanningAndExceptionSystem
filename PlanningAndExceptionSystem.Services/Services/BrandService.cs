using PlanningAndExceptionSystem.Models.DbFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class BrandService : Service<Brand>, IBrandService
    {
        public BrandService(IGenericRepository<Brand> repository, IUnitofWork unitOfWork) : 
            base(repository, unitOfWork) {}
    }
}