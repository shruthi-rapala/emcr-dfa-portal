
namespace EMBC.Database.Contract;


public enum ClaimAppealDecision
{
    [Description("Overturned")]
    Overturned = 222710001,

    [Description("Upheld")]
    Upheld = 222710000,
}

public record ClaimAppealQuery
{
    public Guid? ClaimId { get; set; }
}

public class ClaimAppeal : IDto
{
    public Guid Id { get; set; }
    public StateCode StateCode { get; set; }

    public required string ClaimId { get; set; }

    public ClaimAppealDecision? AppealDecision { get; set; }

}
