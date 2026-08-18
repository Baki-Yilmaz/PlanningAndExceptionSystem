using PlanningAndExceptionSystem.Models.CodeFirst;

namespace PlanningAndExceptionSystem.Models.DbFirst;

public partial class Inventory : BaseEntity
{
    public int ProductId { get; set; }

    public int CategoryId { get; set; }

    public int ShopId { get; set; }

    public int Quantity { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual Shop Shop { get; set; }
}
