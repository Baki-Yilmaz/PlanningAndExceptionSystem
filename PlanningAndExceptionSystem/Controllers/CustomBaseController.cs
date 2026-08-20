using Microsoft.AspNetCore.Mvc;
using PlanningAndExceptionSystem.Models;
using PlanningAndExceptionSystem.Services.Interfaces;
using PlanningAndExceptionSystem.Services.Exceptions;

namespace PlanningAndExceptionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomBaseController<T,TService> : ControllerBase
        where T : class
        where TService : IService<T>
    {
        protected readonly TService _service;

        public CustomBaseController(TService service)
        {
            _service = service;
        }

        [NonAction]
        public IActionResult CreateActionResultInstance<TResponse>(BaseResponse<TResponse> response, int statusCode = 200)
        {
            return StatusCode(statusCode, response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();

            var response = BaseResponse<List<T>>.SuccessResult(result);

            return CreateActionResultInstance(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entity = await _service.GetByIdAsync(id);

            if (entity == null)
            {
                throw new NotFoundException($"{typeof(T).Name} için {id} ID'sine sahip kayıt bulunamadı!");
            }

            var response = BaseResponse<T>.SuccessResult(entity);
            return CreateActionResultInstance(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create(T entity)
        {
            var creaatedEntity = await _service.AddAsync(entity);
            var response = BaseResponse<T>.SuccessResult(creaatedEntity);
            return CreateActionResultInstance(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _service.GetByIdAsync(id);

            if (entity == null)
            {
                throw new NotFoundException("Silinecek kayıt bulunamadı!");
            }

            await _service.RemoveAsync(entity);
            var deleteResponse = BaseResponse<object>.SuccessResultNoData();

            return CreateActionResultInstance(deleteResponse);
        }
    }
}