

namespace PlanningAndExceptionSystem.Models
{
    public class BaseResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T? Data { get; set; }
        public int StatusCode { get; set; }
        public List<string> Errors { get; set; }

        public static BaseResponse<T> SuccessResult(T? data, string message = "İşlem Başarılı", int statuscode = 200)
        {
            return new BaseResponse<T>
            {
                Success = true,
                Data = data,
                Message = message,
                StatusCode = statuscode
            };
        }

        public static BaseResponse<T> FailResult(T? data, string message = "İşlem BAŞARISIZ!!!", int statuscode = 400)
        {
            return new BaseResponse<T>
            {
                Success = false,
                Data = data,
                Message = message,
                StatusCode =statuscode
            };
        }

        public static BaseResponse<T> SuccessResultNoData(string message = "İşlem Başarılı", int statuscode = 200)
        {
            return new BaseResponse<T>
            {
                Success = true,
                Message = message,
                StatusCode = statuscode,
                Data = default
            };
        }
        public static BaseResponse<T> FailResultNoData(string message = "İşlem BAŞARISIZ!!!", int statuscode = 400)
        {
            return new BaseResponse<T>
            {
                Success = false,
                Message = message,
                StatusCode = statuscode,
                Data = default
            };
        }

        public static BaseResponse<T> NotFound(string message)
        {
            return new BaseResponse<T>
            {
                StatusCode = 404,
                Errors = new List<string> { message }
            };
        }

        public static BaseResponse<T> BadRequest(string message)
        {
            return new BaseResponse<T>
            {
                StatusCode = 400,
                Errors = new List<string> { message }
            };
        }
    }
}