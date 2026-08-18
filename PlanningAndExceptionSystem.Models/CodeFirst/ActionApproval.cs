namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class ActionApproval : BaseEntity
    {
        public int ExceptionActionId { get; set; }
        public virtual ExceptionAction ExceptionAction { get; set; }

        public int ApprovedById { get; set; }

        public virtual User ApprovedBy {get; set; }
        public string ApprovalStatus { get; set; }
    }
}
