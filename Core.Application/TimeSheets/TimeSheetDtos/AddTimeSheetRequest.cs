using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.TimeSheets.TimeSheetDtos
{
    public class AddTimeSheetRequest
    {
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int TotalHours { get; set; }
        public int IsApproved { get; set; }
    }
}
