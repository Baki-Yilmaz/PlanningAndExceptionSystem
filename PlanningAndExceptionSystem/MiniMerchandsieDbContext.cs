using Microsoft.EntityFrameworkCore;
using PlanningAndExceptionSystem.Models.CodeFirst;
using PlanningAndExceptionSystem.Models.DbFirst;

namespace PlanningAndExceptionSystem;

public partial class MiniMerchandsieDbContext : DbContext
{
    public MiniMerchandsieDbContext()
    {
    }

    public MiniMerchandsieDbContext(DbContextOptions<MiniMerchandsieDbContext> options) : base(options)
    {
    }

    public virtual DbSet<Action> Actions { get; set; }

    public virtual DbSet<ActualSale> ActualSales { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<ExceptionAction> ExceptionActions { get; set; }

    public virtual DbSet<ExceptionRule> ExceptionRules { get; set; }

    public virtual DbSet<Inventory> Inventories { get; set; }

    public virtual DbSet<PlanningException> PlanningExceptions { get; set; }

    public virtual DbSet<PlanningWeek> PlanningWeeks { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<SalesPlan> SalesPlans { get; set; }

    public virtual DbSet<Season> Seasons { get; set; }

    public virtual DbSet<Shop> Shops { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}
