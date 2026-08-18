using PlanningAndExceptionSystem.Models.DbFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class CategoryService : Service<Category>, ICategoryService
    {
        public CategoryService(IGenericRepository<Category> repository, IUnitofWork unitofWork) :
            base(repository, unitofWork) { }
    }
}
