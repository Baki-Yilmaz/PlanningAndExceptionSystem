using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;
using System.Threading.Tasks;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class ActionApprovalService : Service<ActionApproval>, IActionApprovalService
    {
        private readonly IGenericRepository<ExceptionAction> _exceptionActionRepository;
        private readonly IUnitofWork _unitOfWork;

        public ActionApprovalService(
            IGenericRepository<ActionApproval> repository,
            IGenericRepository<ExceptionAction> exceptionActionRepository,
            IUnitofWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _exceptionActionRepository = exceptionActionRepository;
            _unitOfWork = unitOfWork;
        }

        public override async Task<ActionApproval> AddAsync(ActionApproval entity)
        {
            var newApproval = await base.AddAsync(entity);

            var actionToUpdate = await _exceptionActionRepository.GetByIdAsync(entity.ExceptionActionId);

            if (actionToUpdate != null)
            {
                actionToUpdate.Status = entity.ApprovalStatus;

                _exceptionActionRepository.Update(actionToUpdate);
                await _unitOfWork.CommitAsync();
            }

            return newApproval;
        }
    }
}