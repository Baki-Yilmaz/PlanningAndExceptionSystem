using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : CustomBaseController<User, IUserService>
    {
        public UsersController(IUserService service) : base(service) { }
    }
}