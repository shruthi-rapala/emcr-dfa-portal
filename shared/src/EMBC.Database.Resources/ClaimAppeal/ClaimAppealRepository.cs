using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMBC.Database.Model;

namespace EMBC.Database.Resources;

public interface IClaimAppealRepository : IBaseRepository<ClaimAppeal>
{
    IEnumerable<ClaimAppeal> GetWorkflow(ClaimAppealQuery query);
}
    public class ClaimAppealRepository : BaseRepository<DFA_ClaimAppeal, ClaimAppeal>, IClaimAppealRepository
{
    private readonly DatabaseContext _databaseContext;

    public ClaimAppealRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext, mapper)
    {
        _databaseContext = databaseContext;
    }

    public IEnumerable<ClaimAppeal> GetWorkflow(ClaimAppealQuery query)
    {
        var stages = _databaseContext.ProcessStageSet
            .Where(x => x.PrimaryEntityTypeCode == DFA_ClaimAppeal.EntityLogicalName)
            .ToList();

        //var mappedStages = _mapper.Map<IEnumerable<Stage>>(stages);

        var queryResults = (
        from ca in _databaseContext.DFA_ClaimAppealSet
        join cb in _databaseContext.DFA_ClaimAppealBpfSet on ca.Id equals cb.Bpf_DFA_ClaimAppealId.Id
        join ps in _databaseContext.ProcessStageSet on cb.ActiveStageId.Id equals ps.Id
        where ca.DFA_OriginClaim.Id == query.ClaimId
        select new ClaimAppealComposite(ca, cb, ps))
        .ToList();

        // map the results from entity to dto
        var results = _mapper
            .Map<IEnumerable<ClaimAppeal>>(queryResults)
            .ToList();

        results.ForEach(
            ca => ca.ClaimAmountAppeal?.Stages?.ToList().ForEach(
                ce => ce.Name = stages.Single(x => x.Id == ce.Id).StageName));

        return results;


    }

}

public record ClaimAppealWorkFlow(IEnumerable<ClaimAppeal> ClaimAppeals, IEnumerable<Stage> Stages);

public record ClaimAppealComposite(DFA_ClaimAppeal ClaimAppeal, DFA_ClaimAppealBpf claimAppeal, ProcessStage ProcessStage);


