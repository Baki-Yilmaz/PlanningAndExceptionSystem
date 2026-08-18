using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Services.Interfaces;
using System.Net;

namespace PlanningAndExceptionSystem.Services.Services
{
    public class ProductService : Service<Product>, IProductService
    {
        public ProductService(IGenericRepository<Product> repository, IUnitofWork unitofWork) : base(repository, unitofWork) { }
    }
}