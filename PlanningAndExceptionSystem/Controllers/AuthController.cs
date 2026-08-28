using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [Authorize]
        [HttpGet("login-check")]
        public IActionResult LoginCheck()
        {
            var username = User.Identity?.Name ?? "";

            var role = User.FindFirst(ClaimTypes.Role)?.Value ?? "Staff";

            return Ok(new
            {
                success = true,
                username = username,
                role = role,
                message = "Giriş Başarılı"
            });
        }
    }
}