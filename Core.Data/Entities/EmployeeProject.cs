using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Entities
{
    public class EmployeeProject
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int UserId { get; set; }
        public int ProjectId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
    }
}
