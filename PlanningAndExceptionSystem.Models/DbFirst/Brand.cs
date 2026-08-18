namespace PlanningAndExceptionSystem.Models.DbFirst;

public partial class Brand : BaseEntity
{
    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;
}
