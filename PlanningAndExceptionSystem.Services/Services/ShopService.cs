using Microsoft.Identity.Client;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class ShopService : Service<Shop>, IShopService
    {
        public ShopService(IGenericRepository<Shop> repository, IUnitofWork unitofWork) : 
            base(repository, unitofWork) { }
    }
}