using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanningWeeksController : CustomBaseController<PlanningWeek, IPlanningWeekService>
    {
        public PlanningWeeksController(IPlanningWeekService service) : base(service)
        {
        }
    }
}