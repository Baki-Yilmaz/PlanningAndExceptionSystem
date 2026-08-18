using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : CustomBaseController<Product, IProductService>
    {
        public ProductsController(IProductService service) : base(service)
        {
        }
    }
}