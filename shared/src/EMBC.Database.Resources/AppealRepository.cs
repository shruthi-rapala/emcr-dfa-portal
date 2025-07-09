using System;
using System.Linq.Expressions;

namespace EMBC.Database.Resources;

public interface IAppealRepository : IQueryRepository<CaseEligibilityAppealQuery, Appeal>, IBaseRepository<Appeal>
{}

public class AppealRepository : BaseRepository<DFA_Appeal, Appeal>, IAppealRepository
{
    private readonly DatabaseContext _databaseContext;

    public AppealRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext, mapper)
    {
        _databaseContext = databaseContext;
    }

    public IEnumerable<Appeal> Query(CaseEligibilityAppealQuery query)
    {
        var stages = _databaseContext.ProcessStageSet
            .Where(x => x.PrimaryEntityTypeCode == DFA_Appeal.EntityLogicalName)
            .ToList();

        //var caseIdGuid = Guid.Parse(query?.CaseId); // Convert the string CaseId to Guid

        var queryResults = (
            from ca in _databaseContext.DFA_AppealSet
            join ce in _databaseContext.DFA_CaseEligibilityAppealSet on ca.Id equals ce.Bpf_DFA_AppealId.Id
            join ps in _databaseContext.ProcessStageSet on ce.ActiveStageId.Id equals ps.Id
            where ca.DFA_CaseId.Id == query.CaseId // Use the converted Guid for comparison
            select new CaseAppealComposite(ca, ce, ps))
            .ToList();

        var results = _mapper.Map<IEnumerable<Appeal>>(queryResults).ToList();

        results.ForEach(
            ca => ca.CaseEligibilityAppeal?.Stages?.ToList().ForEach(
                ce => ce.Name = stages.Single(x => x.Id == ce.Id).StageName));

        return results;
    }


}

public record CaseAppealComposite(DFA_Appeal caseAppeal, DFA_CaseEligibilityAppeal caseEligibilityAppeal, ProcessStage ProcessStage);
