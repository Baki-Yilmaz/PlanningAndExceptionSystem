using PlanningAndExceptionSystem.Models.CodeFirst;
namespace PlanningAndExceptionSystem.Models.DbFirst;
using System.Text.Json.Serialization;   

public partial class Inventory : BaseEntity
{
    public int ProductId { get; set; }

    public int CategoryId { get; set; }

    public int ShopId { get; set; }

    public int Quantity { get; set; }

    [JsonIgnore]
    public virtual Category? Category { get; set; } = null!;

    [JsonIgnore]
    public virtual Shop? Shop { get; set; }
}
