namespace PlanningAndExceptionSystem.Models.DbFirst;

public partial class Category : BaseEntity
{
    public string Name { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();
}
