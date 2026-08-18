using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeasonsController : CustomBaseController<Season, ISeasonService>
    {
        public SeasonsController(ISeasonService service) : base(service)
        {
        } 
    }
}