using Microsoft.EntityFrameworkCore;

using PlanningAndExceptionSystem.Models.DbFirst;
using PlanningAndExceptionSystem.Models.CodeFirst;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<ActionApproval> ActionApprovals {  get; set; }
    public DbSet<ActualSale> ActualSales { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<ExceptionAction> ExceptionActions { get; set; }
    public DbSet<ExceptionRule> ExceptionRules{ get; set; }
    public DbSet<PlanningException> PlanningExceptions{ get; set; }
    public DbSet<PlanningWeek> PlanningWeeks{ get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<SalesPlan> SalesPlans{ get; set; }
    public DbSet<Season> Seasons{ get; set; }
    public DbSet<Shop> Shops{ get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Brand>().ToTable("Brands", t => t.ExcludeFromMigrations());
        modelBuilder.Entity<Category>().ToTable("Categories", t => t.ExcludeFromMigrations());
        modelBuilder.Entity<Inventory>().ToTable("Inventories", t => t.ExcludeFromMigrations());

        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.NoAction;
        }
    }
}