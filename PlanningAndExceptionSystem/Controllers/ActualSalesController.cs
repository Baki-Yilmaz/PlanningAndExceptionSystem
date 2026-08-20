using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActualSalesController : CustomBaseController<ActualSale, IActualSalesService>
    {
        public ActualSalesController(IActualSalesService service) : base(service)
        {
        }
    }
}