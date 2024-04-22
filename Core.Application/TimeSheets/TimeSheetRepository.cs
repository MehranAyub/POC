using Core.Application.TimeSheets;
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

namespace Core.Application.TimeSheets
{
    internal class TimeSheetRepository:ITimeSheetRepository
    {
        RepositoryContext _repositoryContext;
        public TimeSheetRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public async Task<PayloadCustom<TimeSheet>> GetTimeSheets()
        {
            try
            {
                var sheets =await _repositoryContext.TimeSheets.AsNoTracking().ToListAsync();
                if (sheets == null)
                {
                    return new PayloadCustom<TimeSheet>
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Message = "sheets not found"
                    };
                }
                return new PayloadCustom<TimeSheet>
                {
                    EntityList=sheets,
                    Status = (int)HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<TimeSheet>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "Found an Exception, " + ex.InnerException
                };
            }
        }


        public async Task<PayloadCustom<Project>> GetProjects()
        {
            try
            {
                var projects = await _repositoryContext.Projects.AsNoTracking().ToListAsync();
                if (projects.Count==0)
                {
                    return new PayloadCustom<Project>
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Message = "Projects not found"
                    };
                }
                return new PayloadCustom<Project>
                {
                    EntityList = projects,
                    Status = (int)HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<Project>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "Found an Exception, " + ex.InnerException
                };
            }
        }

        public async void AddTimeSheet(TimeSheet timeSheet)
        {
             await _repositoryContext.TimeSheets.AddAsync(timeSheet);
        }

    }
}
