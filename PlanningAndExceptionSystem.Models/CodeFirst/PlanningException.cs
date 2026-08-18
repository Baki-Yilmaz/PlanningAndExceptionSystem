namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class PlanningException : BaseEntity
    {
        public int SalesPlanId { get; set; }
        public virtual SalesPlan SalesPlan { get; set; } 
        
        public int ExceptionRuleId { get; set; }
        public virtual ExceptionRule ExceptionRule { get; set; }
        public decimal ActualDeviation  { get; set; }
        public PlanningStatusType Status { get; set; } = PlanningStatusType.NewException;
        public bool IsActionTaken { get; set; } = false;
    }

    public enum PlanningStatusType
    {
        NewException = 0,
        Pending = 1,
        Success = 2,
        Failure = 3,
    }
}