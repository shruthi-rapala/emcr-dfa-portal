
using EMBC.Database.Contract.DTO;

namespace EMBC.Database.Contract;


public enum ClaimAppealDecision
{
    [Description("Overturned")]
    Overturned = 222710001,

    [Description("Upheld")]
    Upheld = 222710000,

    [Description("Withdrawn")]
    Withdrawn = 222710002,
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
    public string? ClaimAppealPortalNotes { get; set; }
    public string? ClaimAppealNumber { get; set; }
    public string? DateAppealReceived { get; set; }

    // Related Entities
    public ClaimAmountAppeal? ClaimAmountAppeal { get; set; }

}
