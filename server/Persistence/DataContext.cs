using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : IdentityDbContext<AppUser> {
        public DataContext (DbContextOptions options) : base (options) { }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Idea> Ideas { get; set; }

        protected override void OnModelCreating (ModelBuilder builder) {
            base.OnModelCreating (builder);

            builder.Entity<Tag> ()
                .HasData (
                    new Tag { Id = 1, Name = "OOP" },
                    new Tag { Id = 2, Name = "Functional" },
                    new Tag { Id = 3, Name = "Procedural" }
                );
        }
    }
}