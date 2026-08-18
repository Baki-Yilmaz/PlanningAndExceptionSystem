using PlanningAndExceptionSystem.Models.DbFirst;

namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class Shop : BaseEntity
    {
        public string ShopCode{ get; set; }
        public string ShopName { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
    }
}
