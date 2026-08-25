using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExceptionActionsController : CustomBaseController<ExceptionAction, IExceptionActionService>
    {
        public ExceptionActionsController(IExceptionActionService service) : base(service)
        {
        }
    }
}