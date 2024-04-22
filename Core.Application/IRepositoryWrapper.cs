using Core.Application.TimeSheets;
using Core.Application.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }
        ITimeSheetRepository TimeSheet { get; }
        void Save();
    }
}
