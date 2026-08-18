using PlanningAndExceptionSystem.Models.DbFirst;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class SalesPlan : BaseEntity
    {
        public string SalesPlanCode { get; set; }
        public int TargetQuantity { get; set; }
        public decimal TargetProfit { get; set; }
        public int UserId {  get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("PlanningWeekId")]
        public virtual List<PlanningWeek> PlanningWeek { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }
    }
}