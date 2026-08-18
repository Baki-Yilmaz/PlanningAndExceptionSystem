namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class Season : BaseEntity
    {
        public string SeasonName { get; set; }
        public string SeasonCode { get; set; }
        public string Year { get; set; }
        public bool SeasonIsActive { get; set; } = true;
    }
}
