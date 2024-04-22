using Core.Application.Users.UserDtos;
using Core.Data;
using Core.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static Core.Data.Enums.Enums;

namespace Core.Application.Users
{
    internal class UserRepository:IUserRepository
    {
        RepositoryContext _repositoryContext;
        public UserRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public PayloadCustom<User> GetUserById(int userId)
        {
            try
            {
                var user = _repositoryContext.Users.FirstOrDefault(s => s.Id == userId);
                if (user == null)
                {
                    return new PayloadCustom<User>
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Message = "User not found"
                    };
                }
                return new PayloadCustom<User>
                {
                    Entity = user,
                    Status = (int)HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<User>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "Found an Exception, "+ex.InnerException
                };
            }
        }

        public async Task<PayloadCustom<UserValidationResponse>> ValidateUser(string userId, string password)
        {
            try
            {
                var user =await _repositoryContext.Users.AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId && s.Password==password);
                if (user == null)
                {
                    return new PayloadCustom<UserValidationResponse>
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Message = "User not found"
                    };
                }
                return new PayloadCustom<UserValidationResponse>
                {
                    Entity =new UserValidationResponse(){ UserData = user,IsValid=true,token="ThisIsToken"},
                    Status = (int)HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<UserValidationResponse>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "Found an Exception, " + ex.InnerException
                };
            }
        }

        public async Task<PayloadCustom<UserDto>> GetEmployees()
        {
            try
            {
                var employees = await _repositoryContext.Users.AsNoTracking().Where(s => s.Role == Role.Employee).Select(n =>new UserDto(){Id= n.Id,UserId=n.UserId,Email=n.Email,Name= n.Name}).ToListAsync();
                if (employees.Count==0)
                {
                    return new PayloadCustom<UserDto>
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Message = "Employees not found"
                    };
                }
                return new PayloadCustom<UserDto>
                {
                    EntityList =employees,
                    Status = (int)HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<UserDto>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "Found an Exception, " + ex.InnerException
                };
            }
        }

    }
}
