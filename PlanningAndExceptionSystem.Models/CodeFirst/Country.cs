namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class Country : BaseEntity
    {
        public string CountryName { get; set; }
        public string Region { get; set; }
        public string Currency {  get; set; }
    }
}
