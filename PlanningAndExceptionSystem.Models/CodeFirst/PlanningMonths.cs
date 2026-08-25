namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class PlanningMonths : BaseEntity
    {
        public int Year { get; set; }
        public int MonthNumber { get; set; }
        public string MonthName { get; set; }
        public string Quarter { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
    }
}