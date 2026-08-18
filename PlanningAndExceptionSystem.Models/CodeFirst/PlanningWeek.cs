using System.ComponentModel.DataAnnotations;

namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class PlanningWeek : BaseEntity
    {
        public string PlanningWeekCode { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
        
        [Required]
        public int SeasonId { get; set; }
        public virtual List<Season> Season { get; set; }
    }
}
