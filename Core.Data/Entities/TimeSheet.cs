using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace Core.Data.Entities
{
    public class TimeSheet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public float TotalHours { get; set; }
        public bool IsApproved { get; set; }
        [NotMapped]
        public List<string> Urls { get; set; } = new List<string>();

        public string UrlsJson
        {
            get => JsonSerializer.Serialize(Urls);
            set => Urls = JsonSerializer.Deserialize<List<string>>(value);
        }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
    }
}
