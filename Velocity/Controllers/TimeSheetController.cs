using Core.Application.Users.UserDtos;
using Core.Application;
using Microsoft.AspNetCore.Mvc;
using Core.Data.Entities;
using Core.Application.TimeSheets.TimeSheetDtos;
using Microsoft.Data.SqlClient.Server;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace Velocity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public TimeSheetController(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;
        }
        [HttpGet("GetTimeSheets")]
        public async Task<PayloadCustom<TimeSheet>> GetTimeSheets()
        {
            return await _repository.TimeSheet.GetTimeSheets();
        }
        [HttpGet("GetProjects")]
        public async Task<PayloadCustom<Project>> GetProjects()
        {
            return await _repository.TimeSheet.GetProjects();
        }
        [HttpPost("AddTimeSheet")]
        public async Task<PayloadCustom<TimeSheet>> AddTimeSheet([FromForm] AddTimeSheetRequest timeSheet, [FromForm] List<IFormFile> files)
        {
            try
            {
                var fileUrls = new List<string>();
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var fileName = Path.GetFileNameWithoutExtension(file.FileName);
                        var extension = Path.GetExtension(file.FileName);
                        var newFileName = $"{fileName}_{DateTime.UtcNow:yyyyMMddHHmmssfff}{extension}";
                        var filePath = Path.Combine("Assets", newFileName);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        fileUrls.Add(newFileName);
                    }
                }
                var timeSheetData = new TimeSheet() { ProjectId = (int)timeSheet.ProjectId, UserId = timeSheet.UserId, TotalHours = timeSheet.TotalHours, FromDate = DateTime.Parse(timeSheet.FromDate), ToDate = DateTime.Parse(timeSheet.ToDate), IsApproved = timeSheet.IsApproved == 1 ? true : false, Urls = fileUrls };
                _repository.TimeSheet.AddTimeSheet(timeSheetData);
                _repository.Save();
                return new PayloadCustom<TimeSheet> { Status = (int)HttpStatusCode.OK, Entity = timeSheetData };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<TimeSheet> { Status = (int)HttpStatusCode.InternalServerError, Message = "Found exception," + ex.InnerException };

            }
        }

    }
}
