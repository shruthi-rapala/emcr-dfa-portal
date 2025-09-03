using Microsoft.Xrm.Sdk;

namespace EMBC.Database.Resources
{
    public class InvoiceAppealMapper: Profile
    {
        public InvoiceAppealMapper()
        {
            CreateMap<DFA_InvoiceAppeal, InvoiceAppeal>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.DFA_InvoiceAppealId))
                .ForMember(dest => dest.StateCode, opt => opt.MapFrom(src => src.StateCode.HasValue ? (StateCode)(int)src.StateCode.Value : default))
                .ForMember(dest => dest.OriginInvoiceId, opt => opt.MapFrom(src => src.DFA_OriginInvoice != null ? src.DFA_OriginInvoice.Id : Guid.Empty))
                .ForMember(dest => dest.InvoiceDecisionComments, opts => opts.MapFrom(src => src.DFA_AppealReason));

            CreateMap<InvoiceAppeal, DFA_InvoiceAppeal>()
                .ForMember(dest => dest.DFA_OriginInvoice, opt => opt.MapFrom(src => new EntityReference("invoice", Guid.Parse(src.OriginInvoiceId))))
                .ForMember(dest => dest.DFA_ClaimAppeal, opt => opt.MapFrom(src => new EntityReference("dfa_claimappeal", Guid.Parse(src.ClaimAppealId))))
                .ForMember(dest => dest.StateCode, opt => opt.MapFrom(src => (DFA_Appeal_StateCode)(int)src.StateCode))
                .ForMember(dest => dest.DFA_AppealReason, opt => opt.MapFrom(src => src.InvoiceDecisionComments));
        }
    }
}
