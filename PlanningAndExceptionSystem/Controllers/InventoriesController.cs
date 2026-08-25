using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.DbFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoriesController : CustomBaseController<Inventory, IInventoryService>
    {
        public InventoriesController(IInventoryService service) : base(service) 
        { 
        }
    }
}