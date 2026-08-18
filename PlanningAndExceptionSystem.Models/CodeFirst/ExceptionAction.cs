namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class ExceptionAction : BaseEntity
    {
        public int PlanningExceptionId { get; set; }
        public virtual PlanningException PlanningException { get; set; }

        public string ActionType { get; set; }
        public string Status { get; set; }
        public int CreatedById { get; set; }
        public virtual User CreatedBy { get; set; }
    }
}
