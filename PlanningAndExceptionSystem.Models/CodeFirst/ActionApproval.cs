using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class ActionApproval : BaseEntity
    {
        public int ExceptionActionId { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual ExceptionAction? ExceptionAction { get; set; }

        public int ApprovedById { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual User? ApprovedBy {get; set; }
        public string ApprovalStatus { get; set; }
    }
}
