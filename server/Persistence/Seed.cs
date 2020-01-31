using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser> {
                    new AppUser {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser {
                        DisplayName = "Slav",
                        UserName = "slav",
                        Email = "slav@test.com"
                    },
                    new AppUser {
                        DisplayName = "Shtip",
                        UserName = "sht",
                        Email = "shtipka@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "123qwe!@#QWE");
                }
            }

            if (!context.Ideas.Any())
            {
                var ideas = new List<Idea> {
                    new Idea ()
                    {
                        Title = "Logo animation",
                        Description = "It will be really cool to create some kind of animation logo.",
                        Category = "uiux",
                        Created = DateTime.Now.AddMonths (-2),
                        Updated = DateTime.Now.AddMonths (-1)
                    },
                    new Idea () {
                    Title = "Icons or characters related to me",
                    Description = "This is my primary goal, but it is really hard to create something cool and new and interesting.",
                    Category = "uiux",
                    Created = DateTime.Now.AddMonths (-1),
                    Updated = DateTime.Now.AddMonths (0)
                    },
                    new Idea () {
                    Title = "Colors, fonts, and styling combinations",
                    Description = "I need to find several that seems to be good and to make a decision, because I don't have time for that right now.",
                    Category = "uiux",
                    Created = DateTime.Now.AddMonths (-5),
                    Updated = DateTime.Now.AddMonths (-2)
                    },
                    new Idea () {
                    Title = "Ideas => Tips => Guides",
                    Description = "The idea is to express something like a evolution of thoughts, notes and eventually to start packing small portions of useful information somehow.",
                    Category = "backend",
                    Created = DateTime.Now.AddMonths (-9),
                    Updated = DateTime.Now.AddMonths (-4)
                    },
                    new Idea () {
                    Title = "Categorize technologies and skills",
                    Description = "I want to split them somehow, because I want to pick the colors and maybe some more elements and styles based on the different categories.",
                    Category = "web",
                    Created = DateTime.Now.AddMonths (-14),
                    Updated = DateTime.Now.AddMonths (-13)
                    },
                    new Idea () {
                    Title = "Create content about my experience in previous projects, about myself and more",
                    Description = "My English is also a problem, that's why this 'Idea' appears here - next to the hardest ones.",
                    Category = "frontend",
                    Created = DateTime.Now.AddMonths (-4),
                    Updated = DateTime.Now.AddMonths (-1)
                    },
                    new Idea () {
                    Title = "Deployment & Automation",
                    Description = "I have to decide which cloud to use for production, and what are available promotions and free trials.",
                    Category = "devops",
                    Created = DateTime.Now.AddMonths (-1),
                    Updated = DateTime.Now.AddMonths (-1)
                    },
                    new Idea () {
                    Title = "Optimizations",
                    Description = "Ask someone to test and to try most of the functionalites, so eventually to fix the bugs.",
                    Category = "devops",
                    Created = DateTime.Now.AddMonths (-2),
                    Updated = DateTime.Now.AddMonths (-1)
                    },
                    new Idea () {
                    Title = "Mails for register and subsciptions with confirmation",
                    Description = "I want to add email service as well, I think that I can setup it for free, but it need to be tested.",
                    Category = "backend",
                    Created = DateTime.Now.AddMonths (-4),
                    Updated = DateTime.Now.AddMonths (-2)
                    },
                    new Idea () {
                    Title = "Add service for downloading my CV",
                    Description = "And I think it should be available only for users with verified mails.",
                    Category = "networking",
                    Created = DateTime.Now.AddMonths (-3),
                    Updated = DateTime.Now.AddMonths (-3)
                    },
                    new Idea () {
                    Title = "Marketing",
                    Description = "I should update almost all social networks, to create posts, guides, tutorials, and many many many more.",
                    Category = "web",
                    Created = DateTime.Now.AddMonths (-19),
                    Updated = DateTime.Now.AddMonths (-13)
                    }
                };

                context.Ideas.AddRange(ideas);
                context.SaveChanges();
            }
        }
    }
}