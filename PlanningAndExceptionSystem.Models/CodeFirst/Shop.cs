using PlanningAndExceptionSystem.Models.DbFirst;
using System.Text.Json.Serialization;

namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class Shop : BaseEntity
    {
        public string ShopCode{ get; set; }
        public string ShopName { get; set; }
        public int CountryId { get; set; }

        [JsonIgnore]
        public virtual Country? Country { get; set; }
    }
}
