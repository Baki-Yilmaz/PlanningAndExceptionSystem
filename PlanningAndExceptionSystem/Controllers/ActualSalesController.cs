using DevExpress.DirectX.Common.Direct2D;
using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;
using PlanningAndExceptionSystem.Services.Services;

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