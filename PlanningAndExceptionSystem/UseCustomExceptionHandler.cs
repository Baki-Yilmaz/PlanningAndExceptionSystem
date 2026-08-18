using PlanningAndExceptionSystem.Models;
using PlanningAndExceptionSystem.Services.Exceptions;
using System.Net;
using System.Text.Json;

namespace PlanningAndExceptionSystem
{
    public class UseCustomExceptionHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<UseCustomExceptionHandler> _logger;

        public UseCustomExceptionHandler(RequestDelegate next, ILogger<UseCustomExceptionHandler> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {   
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var statusCode = HttpStatusCode.InternalServerError;
            var errorMessage = exception.Message;

            var response = exception switch
            {
                NotFoundException => BaseResponse<object>.NotFound(exception.Message),
                BadRequestException => BaseResponse<object>.BadRequest(exception.Message),
            };

            context.Response.StatusCode = response.StatusCode;

            var jsonResponse = JsonSerializer.Serialize(response);
            return context.Response.WriteAsync(jsonResponse);
        }
    }
}