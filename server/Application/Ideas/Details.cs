using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Ideas
{
    public class Details
    {
        public class Query : IRequest<Idea>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Idea>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Idea> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Ideas.FindAsync(request.Id);
            }
        }
    }
}