using PlanningAndExceptionSystem.Models.DbFirst;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class Product : BaseEntity
    {
        [Required]
        [MaxLength(20)]
        public string SkuCode { get; set; }

        [Required]
        [MaxLength(100)]
        public string ProductName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal CostPrice { get; set; }
        
        public int BrandId { get; set; }
        [JsonIgnore]
        public virtual Brand? Brand { get; set; }
       
        public int CategoryId { get; set; }
        [JsonIgnore]
        public virtual Category? Category { get; set; }
    }
}
