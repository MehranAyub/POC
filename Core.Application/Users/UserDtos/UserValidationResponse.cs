using Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Users.UserDtos
{
    public class UserValidationResponse
    {
       public User? UserData { get; set; }
       public bool IsValid { get; set; }
       public string? Token { get; set; }
    }

    public class UserValidationRequest
    {
        public string UserId { get; set; }
        public string Password { get; set; }
    }
    public class UserDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

    }
}
