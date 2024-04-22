using Core.Application.Users.UserDtos;
using Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Users
{
    public interface IUserRepository
    {
        PayloadCustom<User> GetUserById(int id);
        Task<PayloadCustom<UserDto>> GetEmployees();
        Task<PayloadCustom<UserValidationResponse>> ValidateUser(string userId, string password);
    }
}
