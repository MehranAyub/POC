using Core.Application.TimeSheets;
using Core.Application.Users;
using Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application
{
    public class RepositoryWrapper: IRepositoryWrapper
    {
        private RepositoryContext _repositoryContext;
        private IUserRepository _userRepository;
        private ITimeSheetRepository _timeSheetRepository;

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public IUserRepository User
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_repositoryContext);
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
