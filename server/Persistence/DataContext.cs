using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Tag>()
                .HasData(
                    new Tag {Id = 1, Name = "OOP"},
                    new Tag {Id = 2, Name = "Functional"},
                    new Tag {Id = 3, Name = "Procedural"}
                );
        }
    }
}
