using Core.Application.TimeSheets;
using Core.Application.Users;
using Core.Data;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepositoryContext _repositoryContext;
        private IUserRepository _userRepository;
        private ITimeSheetRepository _timeSheetRepository;
        private IConfiguration _configuration;

        public RepositoryWrapper(RepositoryContext repositoryContext, IConfiguration configuration)
        {
            _repositoryContext = repositoryContext;
            _configuration = configuration;
        }
        public IUserRepository User
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_repositoryContext, _configuration);
                }
                return _userRepository;
            }
        }

        public ITimeSheetRepository TimeSheet
        {
            get
            {
                if (_timeSheetRepository == null)
                {
                    _timeSheetRepository = new TimeSheetRepository(_repositoryContext);
                }
                return _timeSheetRepository;
            }
        }
        public void Save()
        {
            _repositoryContext.SaveChanges();
        }


    }
}
