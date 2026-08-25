using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class ExceptionAction : BaseEntity
    {
        public int PlanningExceptionId { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual PlanningException? PlanningException { get; set; }

        public string ActionType { get; set; }
        public string Status { get; set; }
        public int CreatedById { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual User? CreatedBy { get; set; }
    }
}
