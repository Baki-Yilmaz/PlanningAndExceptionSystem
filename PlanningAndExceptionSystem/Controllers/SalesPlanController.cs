using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesPlansController
        : CustomBaseController<SalesPlan, ISalesPlanService>
    {
        public SalesPlansController(ISalesPlanService service)
            : base(service)
        {
        }
    }
}