using PlanningAndExceptionSystem.Models.DbFirst;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class SalesPlan : BaseEntity
    {
        public string SalesPlanCode { get; set; }
        public decimal TargetProfit { get; set; }
        public int UserId {  get; set; }
        [ForeignKey("UserId")]
        public int? PlanningMonthsId { get; set; }
        public virtual PlanningMonths? PlanningMonth { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]

        [JsonIgnore]
        public virtual Category? Category { get; set; }
    }
}