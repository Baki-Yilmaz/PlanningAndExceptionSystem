using PlanningAndExceptionSystem.Models.CodeFirst;

namespace PlanningAndExceptionSystem.Services.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        {
        }

        public static NotFoundException ProductNotFound(int productId)
        {
            return new NotFoundException($"{productId} 'li ürün sistemde bulunamadı!");
        }
    }
}