using System;

namespace Domain
{
    public class Idea
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }
    }
}