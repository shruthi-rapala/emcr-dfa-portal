using EMBC.Database.Contract.DTO;
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

        CreateMap<ProcessStage, Stage>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.StageName));

        CreateMap<DFA_ClaimAppealBpf, ClaimAmountAppeal>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.StateCode, opt => opt.MapFrom(src => src.StateCode))
            .ForMember(dest => dest.CaseAppealId, opt => opt.MapFrom(src => src.Bpf_DFA_ClaimAppealId.Id))
            .ForMember(dest => dest.CompletedOn, opt => opt.MapFrom(src => src.CompletedOn))
             .AfterMap((src, dest) => dest.Stages = src.TraversedPath?.Split(",").Select(x => new Stage { Id = new Guid(x), Name = string.Empty }).ToArray());
      
        CreateMap<ClaimAppealComposite, ClaimAppeal>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ClaimAppeal.DFA_ClaimAppealId))
            .ForMember(dest => dest.StateCode, opt => opt.MapFrom(src => src.ClaimAppeal.StateCode.HasValue ? (StateCode)(int)src.ClaimAppeal.StateCode.Value : default))
            .ForMember(dest => dest.ClaimId, opt => opt.MapFrom(src => src.ClaimAppeal.DFA_OriginClaim != null ? src.ClaimAppeal.DFA_OriginClaim.Id : Guid.Empty))
            .ForMember(dest => dest.ClaimAmountAppeal, opt => opt.MapFrom(src => src.claimAppeal))
            .ForMember(dest => dest.ClaimAppealPortalNotes, opts => opts.MapFrom(src => src.ClaimAppeal.DFA_PortalNote))
            //.ForMember(dest => dest.ClaimAppealStatusPortal, opts => opts.MapFrom(src => src.ClaimAppeal.stat))
            .AfterMap((src, dest) => dest.ClaimAmountAppeal.ActiveStage = new Stage() { Id = src.ProcessStage.Id, Name = src.ProcessStage.StageName });
        
    }
}

