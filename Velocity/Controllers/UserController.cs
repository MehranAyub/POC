using Core.Application;
using Core.Application.Users.UserDtos;
using Core.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Velocity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public UserController(IRepositoryWrapper repositoryWrapper) {
            _repository = repositoryWrapper;
        }
        [Authorize]
        [HttpGet("{id}", Name = "GetUserById")]
        public PayloadCustom<User> GetUserById(int id)
        {
              return _repository.User.GetUserById(id);  
        }
        [HttpPost]
        public async Task<PayloadCustom<UserValidationResponse>> ValidateUser(UserValidationRequest request)
        {
            return await _repository.User.ValidateUser(request.UserId, request.Password);
        }
        [Authorize]
        [HttpGet("GetEmployees")]
        public async Task<PayloadCustom<UserDto>> GetEmployees()
        {
            return await _repository.User.GetEmployees();
        }
    }
}
