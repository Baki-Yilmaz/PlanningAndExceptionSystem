using PlanningAndExceptionSystem.Models;
using PlanningAndExceptionSystem.Repositories.Interfaces;

namespace PlanningAndExceptionSystem.Repositories.Repositories
{
    public class UnitofWork : IUnitofWork
    {
        private readonly AppDbContext _context;
        
        public UnitofWork(AppDbContext context)
        {
            _context = context;
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
    }
}
