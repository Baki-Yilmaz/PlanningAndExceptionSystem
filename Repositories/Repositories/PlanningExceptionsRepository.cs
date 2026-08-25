using Microsoft.EntityFrameworkCore;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Repositories.Interfaces;

namespace PlanningAndExceptionSystem.Repositories.Repositories
{
    public class PlanningExceptionsRepository : GenericRepository<PlanningException>, IPlanningExceptionRepository
    {
        private readonly AppDbContext _context;

        public PlanningExceptionsRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task CalculateExceptionsWithSpAsync()
        {
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CalculatePlanningExceptions");
        }
    }
}
