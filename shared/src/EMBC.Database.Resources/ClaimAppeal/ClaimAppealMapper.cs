using Microsoft.Xrm.Sdk;


namespace EMBC.Database.Resources;

public class ClaimAppealMapper : Profile
{
    public ClaimAppealMapper()
    {
        CreateMap<DFA_ClaimAppeal, ClaimAppeal>()
          .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.DFA_ClaimAppealId))
          .ForMember(dest => dest.StateCode, opt => opt.MapFrom(src => src.StateCode.HasValue ? (StateCode)(int)src.StateCode.Value : default))
          .ForMember(dest => dest.ClaimId, opt => opt.MapFrom(src => src.DFA_OriginClaim != null ? src.DFA_OriginClaim.Id : Guid.Empty));

        CreateMap<ClaimAppeal, DFA_ClaimAppeal>()
            .ForMember(dest => dest.DFA_OriginClaim, opt => opt.MapFrom(src => new EntityReference("dfa_projectclaim", Guid.Parse(src.ClaimId))))
            .ForMember(dest => dest.StateCode, opt => opt.MapFrom(src => (DFA_Appeal_StateCode)(int)src.StateCode));
    }
}

