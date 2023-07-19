using System;
using EMBC.DFA.API;
using EMBC.DFA.API.ConfigurationModule.Models;
using EMBC.DFA.API.ConfigurationModule.Models.Dynamics;
using EMBC.DFA.API.Controllers;

namespace EMBC.DFA.API.Mappers
{
    public class Mappings : AutoMapper.Profile
    {
        public Mappings()
        {
            //(!string.IsNullOrEmpty(s.PersonalDetails.IndigenousStatus) ? (s.PersonalDetails.IndigenousStatus.ToLower() == "yes" ? true : false) : null)
            CreateMap<Profile, dfa_appcontact>()
                .ForMember(d => d.dfa_firstname, opts => opts.MapFrom(s => s.PersonalDetails.FirstName))
                .ForMember(d => d.dfa_lastname, opts => opts.MapFrom(s => s.PersonalDetails.LastName))
                .ForMember(d => d.dfa_initial, opts => opts.MapFrom(s => s.PersonalDetails.Initials))
                .ForMember(d => d.dfa_isindigenous, opts => opts.MapFrom(s => (!string.IsNullOrEmpty(s.PersonalDetails.IndigenousStatus) ? (s.PersonalDetails.IndigenousStatus.ToLower() == "yes" ? true : false) : (bool?)null)))
                .ForMember(d => d.dfa_emailaddress, opts => opts.MapFrom(s => s.ContactDetails.Email))
                .ForMember(d => d.dfa_cellphonenumber, opts => opts.MapFrom(s => s.ContactDetails.CellPhoneNumber))
                .ForMember(d => d.dfa_residencetelephonenumber, opts => opts.MapFrom(s => s.ContactDetails.ResidencePhone))
                .ForMember(d => d.dfa_alternatephonenumber, opts => opts.MapFrom(s => s.ContactDetails.AlternatePhone))
                .ForMember(d => d.dfa_primaryaddressline1, opts => opts.MapFrom(s => s.PrimaryAddress.AddressLine1))
                .ForMember(d => d.dfa_primaryaddressline2, opts => opts.MapFrom(s => s.PrimaryAddress.AddressLine2))
                .ForMember(d => d.dfa_primarycity, opts => opts.MapFrom(s => s.PrimaryAddress.City))
                .ForMember(d => d.dfa_primarypostalcode, opts => opts.MapFrom(s => s.PrimaryAddress.PostalCode))
                .ForMember(d => d.dfa_primarystateprovince, opts => opts.MapFrom(s => s.PrimaryAddress.StateProvince))
                .ForMember(d => d.dfa_secondaryaddressline1, opts => opts.MapFrom(s => s.MailingAddress.AddressLine1))
                .ForMember(d => d.dfa_secondaryaddressline2, opts => opts.MapFrom(s => s.MailingAddress.AddressLine2))
                .ForMember(d => d.dfa_secondarycity, opts => opts.MapFrom(s => s.MailingAddress.City))
                .ForMember(d => d.dfa_secondarypostalcode, opts => opts.MapFrom(s => s.MailingAddress.PostalCode))
                .ForMember(d => d.dfa_secondarystateprovince, opts => opts.MapFrom(s => s.MailingAddress.StateProvince))
                .ForMember(d => d.dfa_bcservicecardid, opts => opts.MapFrom(s => s.Id))
                .ForMember(d => d.dfa_isprimaryandsecondaryaddresssame, opts => opts.MapFrom(s => (!string.IsNullOrEmpty(s.IsMailingAddressSameAsPrimaryAddress) ?
                                                (s.IsMailingAddressSameAsPrimaryAddress.ToLower() == "yes" ? 222710000 :
                                                (s.IsMailingAddressSameAsPrimaryAddress.ToLower() == "no" ? 222710001 : 222710002)) : 222710002)))
                ;

            CreateMap<DFAApplicationStart, dfa_appapplicationstart>()
                .ForMember(d => d.dfa_applicanttype, opts => opts.MapFrom(s => s.AppTypeInsurance.applicantOption == ApplicantOption.Homeowner ? ApplicantTypeOptionSet.HomeOwner :
                    (s.AppTypeInsurance.applicantOption == ApplicantOption.ResidentialTenant ? ApplicantTypeOptionSet.ResidentialTenant :
                    (s.AppTypeInsurance.applicantOption == ApplicantOption.FarmOwner ? ApplicantTypeOptionSet.FarmOwner :
                    (s.AppTypeInsurance.applicantOption == ApplicantOption.CharitableOrganization ? ApplicantTypeOptionSet.CharitableOrganization :
                    (s.AppTypeInsurance.applicantOption == ApplicantOption.SmallBusinessOwner ? ApplicantTypeOptionSet.SmallBusinessOwner : ApplicantTypeOptionSet.HomeOwner))))))
                .ForMember(d => d.dfa_doyouhaveinsurancecoverage2, opts => opts.MapFrom(s => s.AppTypeInsurance.insuranceOption == InsuranceOption.Yes ? InsuranceTypeOptionSet.Yes :
                    (s.AppTypeInsurance.insuranceOption == InsuranceOption.No ? InsuranceTypeOptionSet.No :
                    (s.AppTypeInsurance.insuranceOption == InsuranceOption.Unsure ? InsuranceTypeOptionSet.YesBut : InsuranceTypeOptionSet.Yes))))
                .ForMember(d => d.dfa_appcontactid, opts => opts.MapFrom(s => s.ProfileVerification.profileId))
                .ForMember(d => d.dfa_primaryapplicantsignednoins, opts => opts.MapFrom(s => s.AppTypeInsurance.applicantSignature != null ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                .ForMember(d => d.dfa_primaryapplicantprintnamenoins, opts => opts.MapFrom(s => s.AppTypeInsurance.applicantSignature.signedName))
                .ForMember(d => d.dfa_primaryapplicantsigneddatenoins, opts => opts.MapFrom(s => s.AppTypeInsurance.applicantSignature.dateSigned))
                .ForMember(d => d.dfa_primaryapplicantsignaturenoins, opts => opts.MapFrom(s => s.AppTypeInsurance.applicantSignature != null ? Convert.FromBase64String(s.AppTypeInsurance.applicantSignature.signature.Substring(s.AppTypeInsurance.applicantSignature.signature.IndexOf(',') + 1)) : null))
                .ForMember(d => d.dfa_secondaryapplicantsignednoins, opts => opts.MapFrom(s => s.AppTypeInsurance.secondaryApplicantSignature != null ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                .ForMember(d => d.dfa_secondaryapplicantprintnamenoins, opts => opts.MapFrom(s => s.AppTypeInsurance.secondaryApplicantSignature.signedName))
                .ForMember(d => d.dfa_secondaryapplicantsigneddatenoins, opts => opts.MapFrom(s => s.AppTypeInsurance.secondaryApplicantSignature.dateSigned))
                .ForMember(d => d.dfa_secondaryapplicantsignaturenoins, opts => opts.MapFrom(s => s.AppTypeInsurance.secondaryApplicantSignature != null ? Convert.FromBase64String(s.AppTypeInsurance.secondaryApplicantSignature.signature.Substring(s.AppTypeInsurance.secondaryApplicantSignature.signature.IndexOf(',') + 1)) : null));

            CreateMap<dfa_appapplicationstart, ProfileVerification>()
               .ForMember(d => d.profileVerified, opts => opts.Ignore())
               .ForMember(d => d.profileId, opts => opts.MapFrom(s => s.dfa_appcontactid));

            CreateMap<dfa_appapplicationstart, Consent>()
                .ForMember(d => d.consent, opts => opts.Ignore());

            CreateMap<dfa_appapplicationstart, AppTypeInsurance>()
                .ForMember(d => d.farmOption, opts => opts.Ignore())
                .ForMember(d => d.smallBusinessOption, opts => opts.Ignore())
                .ForPath(d => d.applicantSignature.signature, opts => opts.MapFrom(s => Convert.ToBase64String(s.dfa_primaryapplicantsignaturenoins)))
                .ForPath(d => d.applicantSignature.dateSigned, opts => opts.MapFrom(s => s.dfa_primaryapplicantsigneddatenoins))
                .ForPath(d => d.applicantSignature.signedName, opts => opts.MapFrom(s => s.dfa_primaryapplicantprintnamenoins))
                .ForPath(d => d.secondaryApplicantSignature.signature, opts => opts.MapFrom(s => Convert.ToBase64String(s.dfa_secondaryapplicantsignaturenoins)))
                .ForPath(d => d.secondaryApplicantSignature.dateSigned, opts => opts.MapFrom(s => s.dfa_secondaryapplicantsigneddatenoins))
                .ForPath(d => d.secondaryApplicantSignature.signedName, opts => opts.MapFrom(s => s.dfa_secondaryapplicantprintnamenoins))
                .ForMember(d => d.applicantOption, opts => opts.MapFrom(s => s.dfa_applicanttype == (int)ApplicantTypeOptionSet.HomeOwner ? ApplicantOption.Homeowner :
                    (s.dfa_applicanttype == (int)ApplicantTypeOptionSet.ResidentialTenant ? ApplicantOption.ResidentialTenant :
                    (s.dfa_applicanttype == (int)ApplicantTypeOptionSet.SmallBusinessOwner ? ApplicantOption.SmallBusinessOwner :
                    (s.dfa_applicanttype == (int)ApplicantTypeOptionSet.FarmOwner ? ApplicantOption.FarmOwner :
                    (s.dfa_applicanttype == (int)ApplicantTypeOptionSet.CharitableOrganization ? ApplicantOption.CharitableOrganization : ApplicantOption.Homeowner))))))
                .ForMember(d => d.insuranceOption, opts => opts.MapFrom(s => s.dfa_doyouhaveinsurancecoverage2 == (int)InsuranceTypeOptionSet.Yes ? InsuranceOption.Yes :
                    (s.dfa_doyouhaveinsurancecoverage2 == (int)InsuranceTypeOptionSet.No ? InsuranceOption.No :
                    (s.dfa_doyouhaveinsurancecoverage2 == (int)InsuranceTypeOptionSet.YesBut ? InsuranceOption.Unsure : InsuranceOption.Yes))));

            CreateMap<Controllers.Profile, ESS.Shared.Contracts.Events.RegistrantProfile>()
                .ForMember(d => d.Id, opts => opts.Ignore())
                .ForMember(d => d.AuthenticatedUser, opts => opts.Ignore())
                .ForMember(d => d.VerifiedUser, opts => opts.Ignore())
                .ForMember(d => d.IsMinor, opts => opts.Ignore())
                .ForMember(d => d.UserId, opts => opts.MapFrom(s => s.Id))
                .ForMember(d => d.FirstName, opts => opts.MapFrom(s => s.PersonalDetails.FirstName))
                .ForMember(d => d.LastName, opts => opts.MapFrom(s => s.PersonalDetails.LastName))
                .ForMember(d => d.Initials, opts => opts.MapFrom(s => s.PersonalDetails.Initials))
                .ForMember(d => d.Email, opts => opts.MapFrom(s => s.ContactDetails.Email))
                .ForMember(d => d.Phone, opts => opts.MapFrom(s => s.ContactDetails.CellPhoneNumber))
                .ForMember(d => d.CreatedOn, opts => opts.Ignore())
                .ForMember(d => d.LastModified, opts => opts.Ignore())
                .ForMember(d => d.CreatedByDisplayName, opts => opts.Ignore())
                .ForMember(d => d.CreatedByUserId, opts => opts.Ignore())
                .ForMember(d => d.LastModifiedDisplayName, opts => opts.Ignore())
                .ForMember(d => d.LastModifiedUserId, opts => opts.Ignore())

                .ReverseMap()

                .ForMember(d => d.IsMailingAddressSameAsPrimaryAddress, opts => opts.MapFrom(s =>
                    string.Equals(s.MailingAddress.Country, s.PrimaryAddress.Country, StringComparison.InvariantCultureIgnoreCase) &&
                    string.Equals(s.MailingAddress.StateProvince, s.PrimaryAddress.StateProvince, StringComparison.InvariantCultureIgnoreCase) &&
                    string.Equals(s.MailingAddress.Community, s.PrimaryAddress.Community, StringComparison.InvariantCultureIgnoreCase) &&
                    string.Equals(s.MailingAddress.City, s.PrimaryAddress.City, StringComparison.InvariantCultureIgnoreCase) &&
                    string.Equals(s.MailingAddress.PostalCode, s.PrimaryAddress.PostalCode, StringComparison.InvariantCultureIgnoreCase) &&
                    string.Equals(s.MailingAddress.AddressLine1, s.PrimaryAddress.AddressLine1, StringComparison.InvariantCultureIgnoreCase) &&
                    string.Equals(s.MailingAddress.AddressLine2, s.PrimaryAddress.AddressLine2, StringComparison.InvariantCultureIgnoreCase)))
                ;

            CreateMap<SecurityQuestion, ESS.Shared.Contracts.Events.SecurityQuestion>()
                .ReverseMap()
                ;

            CreateMap<Address, ESS.Shared.Contracts.Events.Address>()
                .ReverseMap()
                ;

            CreateMap<NeedsAssessment, ESS.Shared.Contracts.Events.NeedsAssessment>()
                .ForMember(d => d.CompletedOn, opts => opts.MapFrom(s => DateTime.UtcNow))
                .ForMember(d => d.Notes, opts => opts.Ignore())
                .ForMember(d => d.RecommendedReferralServices, opts => opts.Ignore())
                .ForMember(d => d.HaveMedicalSupplies, opts => opts.Ignore())
                .ForMember(d => d.CanProvideFood, opts => opts.MapFrom(s => s.CanEvacueeProvideFood))
                .ForMember(d => d.CanProvideLodging, opts => opts.MapFrom(s => s.CanEvacueeProvideLodging))
                .ForMember(d => d.CanProvideClothing, opts => opts.MapFrom(s => s.CanEvacueeProvideClothing))
                .ForMember(d => d.CanProvideTransportation, opts => opts.MapFrom(s => s.CanEvacueeProvideTransportation))
                .ForMember(d => d.CanProvideIncidentals, opts => opts.MapFrom(s => s.CanEvacueeProvideIncidentals))
                .ForMember(d => d.TakeMedication, opts => opts.MapFrom(s => s.HaveMedication))
                .ForMember(d => d.HavePetsFood, opts => opts.MapFrom(s => s.HasPetsFood))
                .ForMember(d => d.CompletedBy, opts => opts.Ignore())
             ;

            CreateMap<ESS.Shared.Contracts.Events.NeedsAssessment, NeedsAssessment>()
                .ForMember(d => d.CanEvacueeProvideFood, opts => opts.MapFrom(s => s.CanProvideFood))
                .ForMember(d => d.CanEvacueeProvideLodging, opts => opts.MapFrom(s => s.CanProvideLodging))
                .ForMember(d => d.CanEvacueeProvideClothing, opts => opts.MapFrom(s => s.CanProvideClothing))
                .ForMember(d => d.CanEvacueeProvideTransportation, opts => opts.MapFrom(s => s.CanProvideTransportation))
                .ForMember(d => d.CanEvacueeProvideIncidentals, opts => opts.MapFrom(s => s.CanProvideIncidentals))
                .ForMember(d => d.HaveMedication, opts => opts.MapFrom(s => s.TakeMedication))
                .ForMember(d => d.HasPetsFood, opts => opts.MapFrom(s => s.HavePetsFood))
             ;

            CreateMap<HouseholdMember, ESS.Shared.Contracts.Events.HouseholdMember>()
                .ForMember(d => d.FirstName, opts => opts.MapFrom(s => s.Details.FirstName))
                .ForMember(d => d.LastName, opts => opts.MapFrom(s => s.Details.LastName))
                .ForMember(d => d.Initials, opts => opts.MapFrom(s => s.Details.Initials))
                .ForMember(d => d.IsPrimaryRegistrant, opts => opts.MapFrom(s => s.IsPrimaryRegistrant))
                .ForMember(d => d.LinkedRegistrantId, opts => opts.Ignore())
                .ForMember(d => d.RestrictedAccess, opts => opts.Ignore())
                .ForMember(d => d.Verified, opts => opts.Ignore())
                .ForMember(d => d.Authenticated, opts => opts.Ignore())
                .ForMember(d => d.IsMinor, opts => opts.Ignore())
                ;

            CreateMap<ESS.Shared.Contracts.Events.HouseholdMember, HouseholdMember>()
                .ForPath(d => d.Details.FirstName, opts => opts.MapFrom(s => s.FirstName))
                .ForPath(d => d.Details.LastName, opts => opts.MapFrom(s => s.LastName))
                .ForPath(d => d.Details.Initials, opts => opts.MapFrom(s => s.Initials))
                ;

            CreateMap<Pet, ESS.Shared.Contracts.Events.Pet>()
                .ReverseMap()
                ;

            CreateMap<EvacuationFile, ESS.Shared.Contracts.Events.EvacuationFile>()
                .ForMember(d => d.Id, opts => opts.MapFrom(s => s.FileId))
                .ForMember(d => d.RelatedTask, opts => opts.Ignore())
                .ForMember(d => d.CreatedOn, opts => opts.Ignore())
                .ForMember(d => d.EvacuationDate, opts => opts.MapFrom(s => DateTime.UtcNow))
                .ForMember(d => d.RestrictedAccess, opts => opts.Ignore())
                .ForMember(d => d.PrimaryRegistrantId, opts => opts.Ignore())
                .ForMember(d => d.PrimaryRegistrantUserId, opts => opts.Ignore())
                .ForMember(d => d.SecurityPhraseChanged, opts => opts.MapFrom(s => s.SecretPhraseEdited))
                .ForMember(d => d.SecurityPhrase, opts => opts.MapFrom(s => s.SecretPhrase))
                .ForMember(d => d.RegistrationLocation, opts => opts.Ignore())
                .ForMember(d => d.Status, opts => opts.MapFrom(s => EvacuationFileStatus.Pending))
                .ForMember(d => d.HouseholdMembers, opts => opts.Ignore())
                .ForMember(d => d.Notes, opts => opts.Ignore())
                .ForMember(d => d.Supports, opts => opts.Ignore())
                ;

            CreateMap<ESS.Shared.Contracts.Events.EvacuationFile, EvacuationFile>()
                .ForMember(d => d.FileId, opts => opts.MapFrom(s => s.Id))
                .ForMember(d => d.EvacuationFileDate, opts => opts.MapFrom(s => s.EvacuationDate))
                .ForMember(d => d.IsRestricted, opts => opts.MapFrom(s => s.RestrictedAccess))
                .ForMember(d => d.SecretPhrase, opts => opts.MapFrom(s => s.SecurityPhrase))
                .ForMember(d => d.SecretPhraseEdited, opts => opts.MapFrom(s => false))
                .ForMember(d => d.LastModified, opts => opts.Ignore())
                ;

            CreateMap<ESS.Shared.Contracts.Events.Support, Support>()
                .IncludeAllDerived()
                .ForMember(d => d.IssuingMemberTeamName, opts => opts.MapFrom(s => s.IssuedBy.TeamName))
                .ForMember(d => d.Method, opts => opts.Ignore())
                .ForMember(d => d.SupplierId, opts => opts.Ignore())
                .ForMember(d => d.SupplierName, opts => opts.Ignore())
                .ForMember(d => d.SupplierLegalName, opts => opts.Ignore())
                .ForMember(d => d.SupplierAddress, opts => opts.Ignore())
                .ForMember(d => d.IssuedToPersonName, opts => opts.Ignore())
                .ForMember(d => d.ManualReferralId, opts => opts.Ignore())
                .ForMember(d => d.NotificationEmail, opts => opts.Ignore())
                .ForMember(d => d.NofificationMobile, opts => opts.Ignore())
                .ForMember(d => d.RecipientFirstName, opts => opts.Ignore())
                .ForMember(d => d.RecipientLastName, opts => opts.Ignore())
                .ForMember(d => d.SecurityQuestion, opts => opts.Ignore())
                .ForMember(d => d.SecurityAnswer, opts => opts.Ignore())
                .AfterMap((s, d, ctx) =>
                {
                    if (s.SupportDelivery is ESS.Shared.Contracts.Events.Referral referral)
                    {
                        d.Method = SupportMethod.Referral;
                        d.SupplierId = referral.SupplierDetails?.Id;
                        d.SupplierName = referral.SupplierDetails?.Name;
                        d.SupplierLegalName = referral.SupplierDetails?.LegalName;
                        d.SupplierAddress = ctx.Mapper.Map<Address>(referral.SupplierDetails?.Address);
                        d.IssuedToPersonName = referral.IssuedToPersonName;
                        d.ManualReferralId = referral.ManualReferralId;
                    }
                    else if (s.SupportDelivery is ESS.Shared.Contracts.Events.Interac eTransfer)
                    {
                        d.Method = SupportMethod.ETransfer;
                        d.NofificationMobile = eTransfer.NotificationMobile;
                        d.NotificationEmail = eTransfer.NotificationEmail;
                        d.RecipientFirstName = eTransfer.RecipientFirstName;
                        d.RecipientLastName = eTransfer.RecipientLastName;
                        d.SecurityQuestion = eTransfer.SecurityQuestion;
                        d.SecurityAnswer = eTransfer.SecurityAnswer;
                    }
                    else
                    {
                        d.Method = SupportMethod.Unknown;
                    }
                })
                ;

            CreateMap<ESS.Shared.Contracts.Events.ClothingSupport, ClothingSupport>()
                ;

            CreateMap<ESS.Shared.Contracts.Events.IncidentalsSupport, IncidentalsSupport>()
                ;

            CreateMap<ESS.Shared.Contracts.Events.FoodGroceriesSupport, FoodGroceriesSupport>()
                ;

            CreateMap<ESS.Shared.Contracts.Events.FoodRestaurantSupport, FoodRestaurantSupport>()
                ;

            CreateMap<ESS.Shared.Contracts.Events.LodgingBilletingSupport, LodgingBilletingSupport>()
                ;

            CreateMap<ESS.Shared.Contracts.Events.LodgingGroupSupport, LodgingGroupSupport>()
                ;

            CreateMap<ESS.Shared.Contracts.Events.LodgingHotelSupport, LodgingHotelSupport>()
                ;

            CreateMap<ESS.Shared.Contracts.Events.TransportationOtherSupport, TransportationOtherSupport>()
                ;

            CreateMap<ESS.Shared.Contracts.Events.TransportationTaxiSupport, TransportationTaxiSupport>()
                ;
        }
    }
}
