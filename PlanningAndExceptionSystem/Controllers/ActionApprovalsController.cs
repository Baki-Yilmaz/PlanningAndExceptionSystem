using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionApprovalsController : CustomBaseController<ActionApproval, IActionApprovalService>
    {
        public ActionApprovalsController(IActionApprovalService service) : base(service)
        {
        }
    }
}
