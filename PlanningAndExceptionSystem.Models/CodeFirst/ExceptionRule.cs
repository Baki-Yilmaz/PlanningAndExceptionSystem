namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class ExceptionRule : BaseEntity
    {
        public string Name { get; set; }
        public decimal ThresholdPercentage { get; set; }
        public string Operator { get; set; }
        public bool IsActive { get; set; } = true;
    }
}