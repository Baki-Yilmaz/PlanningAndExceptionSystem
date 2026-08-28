using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExceptionRuleController : CustomBaseController<ExceptionRule, IExceptionRuleService> 
    {
        public ExceptionRuleController(IExceptionRuleService service) : base(service)
        {
        }
    }
}
