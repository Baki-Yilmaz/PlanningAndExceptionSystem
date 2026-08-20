namespace PlanningAndExceptionSystem.Models.CodeFirst
{
    public class ActualSale : BaseEntity
    {
        public int ShopId { get; set; }
        public virtual Shop? Shop { get; set; }
        public int PlanningWeekId { get; set; }
        public virtual PlanningWeek? Week { get; set; }
        public int ProductId { get; set; }
        public virtual Product? Product { get; set; }
        public decimal SoldQuantity { get; set; }
        public decimal TotalCost { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal Profit { get; set; }
    }
}
