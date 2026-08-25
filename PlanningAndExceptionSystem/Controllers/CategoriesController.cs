using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.DbFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : CustomBaseController<Category, ICategoryService>
    {
        public CategoriesController(ICategoryService service) : base(service) 
        {
        }
    }
}