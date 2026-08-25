using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class ExceptionActionService : Service<ExceptionAction>, IExceptionActionService
    {
        public ExceptionActionService(IGenericRepository<ExceptionAction> repository, IUnitofWork unitOfWork)
            : base(repository, unitOfWork){}   
    }
}