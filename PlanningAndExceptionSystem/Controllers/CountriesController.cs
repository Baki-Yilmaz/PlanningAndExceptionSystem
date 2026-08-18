using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : CustomBaseController<Country, ICountryService>
    {
        public CountriesController(ICountryService service) : base(service  ) { }
    }
}