using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanningExceptionsController : CustomBaseController<PlanningException, IPlanningExceptionService>
    {
        public PlanningExceptionsController(IPlanningExceptionService service)
            : base(service)
        {
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> CalculateExceptions()
        {
            await _service.CalculateExceptionsAsync();

            var response = BaseResponse<object>.SuccessResultNoData();
            return CreateActionResultInstance(response);
        }
    }
}