using Core.Application.TimeSheets;
using Core.Application.TimeSheets.TimeSheetDtos;
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
    internal class TimeSheetRepository : ITimeSheetRepository
    {
        RepositoryContext _repositoryContext;
        public TimeSheetRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public async Task<PayloadCustom<TimeSheet>> GetTimeSheets(GetTimeSheetsRequest request)
        {
            try
            {
                var sheets = await _repositoryContext.TimeSheets.AsNoTracking().Include(ts => ts.User)
                            .Include(ts => ts.Project).Where(n =>
        (string.IsNullOrEmpty(request.EmployeeName) || n.User.Name.Contains(request.EmployeeName)) &&
        (string.IsNullOrEmpty(request.CustomerName) || n.Project.CustomerName.Contains(request.CustomerName)) &&
        (string.IsNullOrEmpty(request.FromDate) || n.FromDate>= DateTime.Parse(request.FromDate)) &&
        (string.IsNullOrEmpty(request.ToDate) || n.ToDate <= DateTime.Parse(request.ToDate)))
                            .Select(ts => new TimeSheet()
                            {
                                Id = ts.Id,
                                UserId = ts.UserId,
                                ProjectId = ts.ProjectId,
                                FromDate = ts.FromDate,
                                ToDate = ts.ToDate,
                                TotalHours = ts.TotalHours,
                                IsApproved = ts.IsApproved,
                                Urls = ts.Urls,
                                User = new User() { Id = ts.User.Id, Name = ts.User.Name, Email = ts.User.Email, UserId = ts.User.UserId },
                                Project = new Project() { Id = ts.Project.Id, Name = ts.Project.Name, CustomerName = ts.Project.CustomerName }

                            }).ToListAsync();
                if (sheets.Count == 0)
                {
                    return new PayloadCustom<TimeSheet>
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Message = "sheets not found"
                    };
                }
                return new PayloadCustom<TimeSheet>
                {
                    EntityList = sheets,
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
                if (projects.Count == 0)
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
        public async Task<bool> DeleteTimeSheet(int id)
        {
            var timeSheet=await _repositoryContext.TimeSheets.FirstOrDefaultAsync(n=>n.Id == id);
            if (timeSheet!=null)
            {
                _repositoryContext.TimeSheets.Remove(timeSheet);
                return true;
            }
            return false;
        }
    }
}
