using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMBC.Database.Resources;

public interface IClaimAppealRepository : IBaseRepository<ClaimAppeal>
{
    ClaimAppealWorkFlow GetWorkflow(ClaimAppealQuery query);
}
    public class ClaimAppealRepository : BaseRepository<DFA_ClaimAppeal, ClaimAppeal>, IClaimAppealRepository
{
    private readonly DatabaseContext _databaseContext;

    public ClaimAppealRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext, mapper)
    {
        _databaseContext = databaseContext;
    }

    public ClaimAppealWorkFlow GetWorkflow(ClaimAppealQuery query)
    {
        // TODO # Implemet the query to get the claim stages
        return null;

    }

}

public record ClaimAppealWorkFlow(IEnumerable<ClaimAppeal> ClaimAppeals, IEnumerable<Stage> Stages);
