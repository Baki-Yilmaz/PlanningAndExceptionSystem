using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class UserService : Service<User>, IUserService
    {
        public UserService(IGenericRepository<User> repository, IUnitofWork unitofWork) :
            base(repository, unitofWork) { }
    }
}