using Core.Application.Users.UserDtos;
using Core.Data;
using Core.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Core.Data.Enums.Enums;

namespace Core.Application.Users
{
    internal class UserRepository:IUserRepository
    {
        RepositoryContext _repositoryContext;
        private readonly IConfiguration _configuration;

        public UserRepository(RepositoryContext repositoryContext, IConfiguration configuration)
        {
            _repositoryContext = repositoryContext;
            _configuration = configuration;

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
                var user = await _repositoryContext.Users.AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId && s.Password == password);
                if (user == null)
                {
                    return new PayloadCustom<UserValidationResponse>
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Message = "User not found"
                    };
                }

                // Generate token
                var token = GenerateJwtToken(user);

                return new PayloadCustom<UserValidationResponse>
                {
                    Entity = new UserValidationResponse
                    {
                        UserData = user,
                        IsValid = true,
                        Token = token
                    },
                    Status = (int)HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<UserValidationResponse>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "Found an Exception, " + ex.InnerException?.Message
                };
            }
        }
        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.UserId),
        new Claim(ClaimTypes.Name, user.Name),
        new Claim(ClaimTypes.Email, user.Email)
        // Add more claims as needed
    };

            var keyString = _configuration["Jwt:Key"]; // Ensure this is correctly fetching the key
            if (keyString.Length < 32)
            {
                throw new InvalidOperationException("JWT Key must be at least 32 characters long.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1), // Set token expiration as needed
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
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
