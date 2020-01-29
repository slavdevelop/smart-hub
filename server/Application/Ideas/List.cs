using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Ideas
{
    public class List
    {
        public class Query : IRequest<List<Idea>> { }

        public class Handler : IRequestHandler<Query, List<Idea>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Idea>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ideas = await _context.Ideas.ToListAsync();

                return ideas;
            }
        }
    }
}