using Core.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Core.Data
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options)
       : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<EmployeeProject> EmployeeProjects { get; set; }
        public DbSet<TimeSheet> TimeSheets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TimeSheet>()
                .Property(e => e.UrlsJson)
                .HasColumnName("Urls");
        }
    }
}
