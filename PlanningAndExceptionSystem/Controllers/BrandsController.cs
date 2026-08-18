using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.DbFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : CustomBaseController<Brand, IBrandService>
    {
        public BrandsController(IBrandService service) : base(service)
        {
        }
    }
}