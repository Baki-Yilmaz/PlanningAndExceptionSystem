using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Shopscontroller : CustomBaseController<Shop, IShopService>
    {
        public Shopscontroller(IShopService service) : base(service ) { }
    }
}