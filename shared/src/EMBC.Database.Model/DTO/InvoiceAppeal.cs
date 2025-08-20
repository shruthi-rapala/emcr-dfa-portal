namespace EMBC.Database.Contract;

public record InvoiceAppealQuery
{
    public Guid? ClaimAppealId { get; set; }
}

public class InvoiceAppeal : IDto
{
    public Guid Id { get; set; }
    public StateCode StateCode { get; set; }
    public required string ClaimAppealId { get; set; }
    public required string InvoiceDecisionComments { get; set; }
    public required string OriginInvoiceId { get; set; }

}
