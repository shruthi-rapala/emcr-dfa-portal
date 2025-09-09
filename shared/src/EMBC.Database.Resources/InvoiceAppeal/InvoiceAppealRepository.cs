using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMBC.Database.Resources;

public interface IInvoiceAppealRepository : IBaseRepository<InvoiceAppeal>
{
    InvoiceAppealWorkFlow GetWorkflow(InvoiceAppealQuery query);

    IEnumerable<InvoiceAppeal> GetByAppealId(Guid appealId);
}

public class InvoiceAppealRepository : BaseRepository<DFA_InvoiceAppeal, InvoiceAppeal>, IInvoiceAppealRepository
{
    private readonly DatabaseContext _databaseContext;

    public InvoiceAppealRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext, mapper)
    {
        _databaseContext = databaseContext;
    }

    public InvoiceAppealWorkFlow GetWorkflow(InvoiceAppealQuery query)
    {
        // TODO # Implemet the query to get the claim stages
        return null;

    }

    public IEnumerable<InvoiceAppeal> GetByAppealId(Guid appealId)
    {
        return _databaseContext
            .DFA_InvoiceAppealSet
            .Where(query => query.DFA_ClaimAppeal != null && query.DFA_ClaimAppeal.Id == appealId)
            .Select(result => _mapper.Map<InvoiceAppeal>(result))
            .ToList();
    }

}

public record InvoiceAppealWorkFlow(IEnumerable<InvoiceAppeal> InvoiceAppeals, IEnumerable<Stage> Stages);
