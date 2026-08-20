namespace PlanningAndExceptionSystem.Models
{
    public class BaseResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T? Data { get; set; }
        public List<string> Errors { get; set; }

        public static BaseResponse<T> SuccessResult(T? data, string message = "İşlem Başarılı")
        {
            return new BaseResponse<T>
            {
                Success = true,
                Data = data,
                Message = message
            };
        }

        public static BaseResponse<T> FailResult(T? data, string message = "İşlem BAŞARISIZ!!!")
        {
            return new BaseResponse<T>
            {
                Success = false,
                Data = data,
                Message = message
            };
        }

        public static BaseResponse<T> SuccessResultNoData(string message = "İşlem Başarılı")
        {
            return new BaseResponse<T>
            {
                Success = true,
                Message = message,
                Data = default
            };
        }
        public static BaseResponse<T> FailResultNoData(string message = "İşlem BAŞARISIZ!!!")
        {
            return new BaseResponse<T>
            {
                Success = false,
                Message = message,
                Data = default
            };
        }

        public static BaseResponse<T> NotFound(string message)
        {
            return new BaseResponse<T>
            {
                Errors = new List<string> { message }
            };
        }

        public static BaseResponse<T> BadRequest(string message)
        {
            return new BaseResponse<T>
            {
                Errors = new List<string> { message }
            };
        }

        public static BaseResponse<T> DbForeignKeyError()
        {
            return new BaseResponse<T>
            {
                Errors = new List<string> { " Bu kayda bağlı başka veriler olduğu için bu işlem gerçekleştirilemez!" }
            };
        }
    }
}