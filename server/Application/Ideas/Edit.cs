using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Ideas
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Created { get; set; }
            public DateTime? Updated { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Created).NotEmpty();
                RuleFor(x => x.Updated).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var idea = await _context.Ideas.FindAsync(request.Id);

                if (idea == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { idea = "Not found" });
                }

                idea.Title = request.Title ?? idea.Title;
                idea.Description = request.Description ?? idea.Description;
                idea.Category = request.Category ?? idea.Category;
                idea.Created = request.Created ?? idea.Created;
                idea.Updated = request.Updated ?? idea.Updated;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}