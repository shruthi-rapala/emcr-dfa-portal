using System;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml.Linq;
using EMBC.DFA.API;
using EMBC.DFA.API.ConfigurationModule.Models;
using EMBC.DFA.API.ConfigurationModule.Models.Dynamics;
using EMBC.DFA.API.Controllers;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.StaticFiles;

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
                .ForMember(d => d.dfa_bcservicecardid, opts => opts.MapFrom(s => s.BCServiceCardId))
                .ForMember(d => d.dfa_appcontactid, opts => opts.MapFrom(s => s.Id))
                .ForMember(d => d.dfa_isprimaryandsecondaryaddresssame, opts => opts.MapFrom(s => (!string.IsNullOrEmpty(s.IsMailingAddressSameAsPrimaryAddress) ?
                                                (s.IsMailingAddressSameAsPrimaryAddress.ToLower() == SameAddressOptionSet.Yes.ToString().ToLower() ? Convert.ToInt32(SameAddressOptionSet.Yes) :
                                                (s.IsMailingAddressSameAsPrimaryAddress.ToLower() == SameAddressOptionSet.No.ToString().ToLower() ? Convert.ToInt32(SameAddressOptionSet.No) : Convert.ToInt32(SameAddressOptionSet.NoAddress))) : Convert.ToInt32(SameAddressOptionSet.NoAddress))))
                .ReverseMap()
                .ForMember(d => d.Id, opts => opts.MapFrom(s => s.dfa_appcontactid))
                .ForMember(d => d.IsMailingAddressSameAsPrimaryAddress, opts => opts.MapFrom(s => (s.dfa_isprimaryandsecondaryaddresssame.HasValue ?
                                                (s.dfa_isprimaryandsecondaryaddresssame == Convert.ToInt32(SameAddressOptionSet.Yes) ? SameAddressOptionSet.Yes.ToString() :
                                                (s.dfa_isprimaryandsecondaryaddresssame == Convert.ToInt32(SameAddressOptionSet.No) ? SameAddressOptionSet.No.ToString() : SameAddressOptionSet.NoAddress.ToString())) : SameAddressOptionSet.NoAddress.ToString())))
                .ForMember(d => d.PersonalDetails, opts => opts.MapFrom(s => new PersonDetails()
                {
                    FirstName = s.dfa_firstname,
                    LastName = s.dfa_lastname,
                    Initials = s.dfa_initial
                }))
                ;

            CreateMap<DFAApplicationStart, dfa_appapplicationstart_params>()
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
                .ForMember(d => d.dfa_secondaryapplicantsignednoins, opts => opts.MapFrom(s => s.AppTypeInsurance.secondaryApplicantSignature != null ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                .ForMember(d => d.dfa_secondaryapplicantprintnamenoins, opts => opts.MapFrom(s => s.AppTypeInsurance.secondaryApplicantSignature.signedName))
                .ForMember(d => d.dfa_secondaryapplicantsigneddatenoins, opts => opts.MapFrom(s => s.AppTypeInsurance.secondaryApplicantSignature.dateSigned));

            CreateMap<dfa_appapplicationstart_retrieve, ProfileVerification>()
               .ForMember(d => d.profileVerified, opts => opts.Ignore())
               .ForMember(d => d.profileId, opts => opts.MapFrom(s => s._dfa_applicant_value));

            CreateMap<dfa_appapplicationstart_retrieve, Consent>()
                .ForMember(d => d.consent, opts => opts.Ignore());

            CreateMap<dfa_appapplicationstart_retrieve, AppTypeInsurance>()
                .ForMember(d => d.farmOption, opts => opts.Ignore())
                .ForMember(d => d.smallBusinessOption, opts => opts.Ignore())
                .ForPath(d => d.applicantSignature.dateSigned, opts => opts.MapFrom(s => s.dfa_primaryapplicantsigneddatenoins))
                .ForPath(d => d.applicantSignature.signedName, opts => opts.MapFrom(s => s.dfa_primaryapplicantprintnamenoins))
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

            CreateMap<DFAApplicationMain, dfa_appapplicationmain_params>()
                .ForMember(d => d.dfa_appapplicationid, opts => opts.MapFrom(s => s.Id))
                //.ForMember(d => d.dfa_primaryapplicantprintname, opts => opts.MapFrom(s => s.SignAndSubmit.applicantSignature.signedName))
                //.ForMember(d => d.dfa_primaryapplicantsigneddate, opts => opts.MapFrom(s => s.SignAndSubmit.applicantSignature.dateSigned))
                //.ForMember(d => d.dfa_primaryapplicantsignature, opts => opts.MapFrom(s => s.SignAndSubmit.applicantSignature.signature))
                //.ForMember(d => d.dfa_primaryapplicantsigned, opts => opts.MapFrom(s => s.SignAndSubmit.applicantSignature.signature != null ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_secondaryapplicantprintname, opts => opts.MapFrom(s => s.SignAndSubmit.secondaryApplicantSignature.signedName))
                //.ForMember(d => d.dfa_secondaryapplicantsigneddate, opts => opts.MapFrom(s => s.SignAndSubmit.secondaryApplicantSignature.dateSigned))
                //.ForMember(d => d.dfa_secondaryapplicantsignature, opts => opts.MapFrom(s => s.SignAndSubmit.secondaryApplicantSignature.signature))
                //.ForMember(d => d.dfa_secondaryapplicantsigned, opts => opts.MapFrom(s => s.SignAndSubmit.secondaryApplicantSignature.signature != null ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_causeofdamagewildfire, opts => opts.MapFrom(s => s.PropertyDamage.wildfireDamage == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_causeofdamagestorm, opts => opts.MapFrom(s => s.PropertyDamage.stormDamage == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_causeofdamageflood, opts => opts.MapFrom(s => s.PropertyDamage.floodDamage == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_causeofdamagelandslide, opts => opts.MapFrom(s => s.PropertyDamage.landslideDamage == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_causeofdamageother, opts => opts.MapFrom(s => s.PropertyDamage.otherDamage == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_causeofdamageloss, opts => opts.MapFrom(s => s.PropertyDamage.otherDamageText))
                //.ForMember(d => d.dfa_dateofdamage, opts => opts.MapFrom(s => s.PropertyDamage.damageFromDate))
                //.ForMember(d => d.dfa_dateofdamageto, opts => opts.MapFrom(s => s.PropertyDamage.damageToDate))
                //.ForMember(d => d.dfa_areyounowresidingintheresidence, opts => opts.MapFrom(s => s.PropertyDamage.residingInResidence))
                //.ForMember(d => d.dfa_datereturntotheresidence, opts => opts.MapFrom(s => s.PropertyDamage.dateReturned))
                //.ForMember(d => d.dfa_description, opts => opts.MapFrom(s => s.PropertyDamage.briefDescription))
                //.ForMember(d => d.dfa_doyourlossestotalmorethan1000, opts => opts.MapFrom(s => s.PropertyDamage.lossesExceed1000 == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_wereyouevacuatedduringtheevent, opts => opts.MapFrom(s => s.PropertyDamage.wereYouEvacuated == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                .ForMember(d => d.dfa_damagedpropertystreet1, opts => opts.MapFrom(s => s.damagedPropertyAddress.addressLine1))
                .ForMember(d => d.dfa_damagedpropertystreet2, opts => opts.MapFrom(s => s.damagedPropertyAddress.addressLine2))
                .ForMember(d => d.dfa_damagedpropertycitytext, opts => opts.MapFrom(s => s.damagedPropertyAddress.community))
                .ForMember(d => d.dfa_damagedpropertypostalcode, opts => opts.MapFrom(s => s.damagedPropertyAddress.postalCode))
                .ForMember(d => d.dfa_damagedpropertyprovince, opts => opts.MapFrom(s => s.damagedPropertyAddress.stateProvince))
                .ForMember(d => d.dfa_isthispropertyyourp, opts => opts.MapFrom(s => s.damagedPropertyAddress.occupyAsPrimaryResidence))
                .ForMember(d => d.dfa_indigenousreserve, opts => opts.MapFrom(s => s.damagedPropertyAddress.onAFirstNationsReserve))
                .ForMember(d => d.dfa_nameoffirstnationsr, opts => opts.MapFrom(s => s.damagedPropertyAddress.firstNationsReserve))
                .ForMember(d => d.dfa_manufacturedhom, opts => opts.MapFrom(s => s.damagedPropertyAddress.manufacturedHome))
                .ForMember(d => d.dfa_eligibleforbchomegrantonthisproperty, opts => opts.MapFrom(s => s.damagedPropertyAddress.eligibleForHomeOwnerGrant))
                .ForMember(d => d.dfa_contactfirstname, opts => opts.MapFrom(s => s.damagedPropertyAddress.landlordGivenNames))
                .ForMember(d => d.dfa_contactlastname, opts => opts.MapFrom(s => s.damagedPropertyAddress.landlordSurname))
                .ForMember(d => d.dfa_contactphone1, opts => opts.MapFrom(s => s.damagedPropertyAddress.landlordPhone))
                .ForMember(d => d.dfa_contactemail, opts => opts.MapFrom(s => s.damagedPropertyAddress.landlordEmail))
                //.ForMember(d => d.dfa_haveinvoicesreceiptsforcleanuporrepairs, opts => opts.MapFrom(s => s.CleanUpLog.haveInvoicesOrReceiptsForCleanupOrRepairs == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                //.ForMember(d => d.dfa_acopyofarentalagreementorlease, opts => opts.MapFrom(s => s.SupportingDocuments.hasCopyOfARentalAgreementOrLease == true ? YesNoOptionSet.Yes : YesNoOptionSet.No))
                .ForMember(d => d.dfa_isprimaryanddamagedaddresssame, opts => opts.MapFrom(s => s.damagedPropertyAddress.isPrimaryAndDamagedAddressSame))
                .ForMember(d => d.delete, opts => opts.MapFrom(s => s.deleteFlag));

            CreateMap<dfa_appapplicationmain_retrieve, CleanUpLog>()
                .ForMember(d => d.haveInvoicesOrReceiptsForCleanupOrRepairs, opts => opts.MapFrom(s => s.dfa_haveinvoicesreceiptsforcleanuporrepairs));

            CreateMap<dfa_appapplicationmain_retrieve, SupportingDocuments>()
                .ForMember(d => d.hasCopyOfARentalAgreementOrLease, opts => opts.MapFrom(s => s.dfa_acopyofarentalagreementorlease));

            CreateMap<dfa_appapplicationmain_retrieve, DamagedPropertyAddress>()
                .ForMember(d => d.addressLine1, opts => opts.MapFrom(s => s.dfa_damagedpropertystreet1))
                .ForMember(d => d.addressLine2, opts => opts.MapFrom(s => s.dfa_damagedpropertystreet2))
                .ForMember(d => d.community, opts => opts.MapFrom(s => s.dfa_damagedpropertycitytext))
                .ForMember(d => d.postalCode, opts => opts.MapFrom(s => s.dfa_damagedpropertypostalcode))
                .ForMember(d => d.stateProvince, opts => opts.MapFrom(s => s.dfa_damagedpropertyprovince))
                .ForMember(d => d.occupyAsPrimaryResidence, opts => opts.MapFrom(s => s.dfa_isthispropertyyourp))
                .ForMember(d => d.onAFirstNationsReserve, opts => opts.MapFrom(s => s.dfa_indigenousreserve))
                .ForMember(d => d.firstNationsReserve, opts => opts.MapFrom(s => s.dfa_nameoffirstnationsr))
                .ForMember(d => d.manufacturedHome, opts => opts.MapFrom(s => s.dfa_manufacturedhom))
                .ForMember(d => d.eligibleForHomeOwnerGrant, opts => opts.MapFrom(s => s.dfa_eligibleforbchomegrantonthisproperty))
                .ForMember(d => d.landlordGivenNames, opts => opts.MapFrom(s => s.dfa_contactfirstname))
                .ForMember(d => d.landlordSurname, opts => opts.MapFrom(s => s.dfa_contactlastname))
                .ForMember(d => d.landlordPhone, opts => opts.MapFrom(s => s.dfa_contactphone1))
                .ForMember(d => d.landlordEmail, opts => opts.MapFrom(s => s.dfa_contactemail))
                .ForMember(d => d.isPrimaryAndDamagedAddressSame, opts => opts.MapFrom(s => s.dfa_isprimaryanddamagedaddresssame));

            CreateMap<dfa_appapplicationmain_retrieve, PropertyDamage>()
                .ForMember(d => d.wildfireDamage, opts => opts.MapFrom(s => s.dfa_causeofdamagewildfire == (int)YesNoOptionSet.Yes ? true : false))
                .ForMember(d => d.stormDamage, opts => opts.MapFrom(s => s.dfa_causeofdamagestorm == (int)YesNoOptionSet.Yes ? true : false))
                .ForMember(d => d.landslideDamage, opts => opts.MapFrom(s => s.dfa_causeofdamagelandslide == (int)YesNoOptionSet.Yes ? true : false))
                .ForMember(d => d.otherDamage, opts => opts.MapFrom(s => s.dfa_causeofdamageother == (int)YesNoOptionSet.Yes ? true : false))
                .ForMember(d => d.floodDamage, opts => opts.MapFrom(s => s.dfa_causeofdamageflood == (int)YesNoOptionSet.Yes ? true : false))
                .ForMember(d => d.otherDamageText, opts => opts.MapFrom(s => s.dfa_causeofdamageloss))
                .ForMember(d => d.damageFromDate, opts => opts.MapFrom(s => s.dfa_dateofdamage))
                .ForMember(d => d.damageToDate, opts => opts.MapFrom(s => s.dfa_dateofdamageto))
                .ForMember(d => d.residingInResidence, opts => opts.MapFrom(s => s.dfa_areyounowresidingintheresidence))
                .ForMember(d => d.dateReturned, opts => opts.MapFrom(s => s.dfa_datereturntotheresidence))
                .ForMember(d => d.briefDescription, opts => opts.MapFrom(s => s.dfa_description))
                .ForMember(d => d.lossesExceed1000, opts => opts.MapFrom(s => s.dfa_doyourlossestotalmorethan1000))
                .ForMember(d => d.wereYouEvacuated, opts => opts.MapFrom(s => s.dfa_wereyouevacuatedduringtheevent == (int)YesNoOptionSet.Yes ? true : false));

            CreateMap<dfa_appapplicationmain_retrieve, SignAndSubmit>()
                .ForPath(d => d.applicantSignature.signedName, opts => opts.MapFrom(s => s.dfa_primaryapplicantprintname))
                .ForPath(d => d.applicantSignature.dateSigned, opts => opts.MapFrom(s => s.dfa_primaryapplicantsigneddate))
                .ForPath(d => d.secondaryApplicantSignature.signedName, opts => opts.MapFrom(s => s.dfa_secondaryapplicantprintname))
                .ForPath(d => d.secondaryApplicantSignature.dateSigned, opts => opts.MapFrom(s => s.dfa_secondaryapplicantsigneddate));

            CreateMap<dfa_appsecondaryapplicant_retrieve, SecondaryApplicant>()
                .ForMember(d => d.applicationId, opts => opts.MapFrom(s => s._dfa_appapplicationid_value))
                .ForMember(d => d.id, opts => opts.MapFrom(s => s.dfa_appsecondaryapplicantid))
                .ForMember(d => d.applicantType, opts => opts.MapFrom(s => s.dfa_applicanttype == (int)SecondaryApplicantTypeOptionSet.Contact ? SecondaryApplicantTypeOption.Contact : SecondaryApplicantTypeOption.Organization))
                .ForMember(d => d.email, opts => opts.MapFrom(s => s.dfa_emailaddress))
                .ForMember(d => d.firstName, opts => opts.MapFrom(s => s.dfa_firstname))
                .ForMember(d => d.lastName, opts => opts.MapFrom(s => s.dfa_lastname))
                .ForMember(d => d.phoneNumber, opts => opts.MapFrom(s => s.dfa_phonenumber))
                .ForMember(d => d.deleteFlag, opts => opts.MapFrom(s => false));

            CreateMap<SecondaryApplicant, dfa_appsecondaryapplicant_params>()
                .ForMember(d => d.dfa_appapplicationid, opts => opts.MapFrom(s => s.applicationId))
                .ForMember(d => d.dfa_appsecondaryapplicantid, opts => opts.MapFrom(s => s.id))
                .ForMember(d => d.dfa_applicanttype, opts => opts.MapFrom(s => s.applicantType == (int)SecondaryApplicantTypeOption.Contact ? SecondaryApplicantTypeOptionSet.Contact : SecondaryApplicantTypeOptionSet.Organization))
                .ForMember(d => d.dfa_emailaddress, opts => opts.MapFrom(s => s.email))
                .ForMember(d => d.dfa_firstname, opts => opts.MapFrom(s => s.firstName))
                .ForMember(d => d.dfa_lastname, opts => opts.MapFrom(s => s.lastName))
                .ForMember(d => d.dfa_phonenumber, opts => opts.MapFrom(s => s.phoneNumber))
                .ForMember(d => d.delete, opts => opts.MapFrom(s => s.deleteFlag));

            CreateMap<dfa_appothercontact_retrieve, OtherContact>()
                .ForMember(d => d.applicationId, opts => opts.MapFrom(s => s._dfa_appapplicationid_value))
                .ForMember(d => d.id, opts => opts.MapFrom(s => s.dfa_appothercontactid))
                .ForMember(d => d.email, opts => opts.MapFrom(s => s.dfa_emailaddress))
                .ForMember(d => d.firstName, opts => opts.MapFrom(s => s.dfa_firstname != null ? s.dfa_firstname : s.dfa_name))
                .ForMember(d => d.lastName, opts => opts.MapFrom(s => s.dfa_lastname != null ? s.dfa_lastname : s.dfa_name))
                .ForMember(d => d.phoneNumber, opts => opts.MapFrom(s => s.dfa_phonenumber))
                .ForMember(d => d.deleteFlag, opts => opts.MapFrom(s => false));

            CreateMap<FullTimeOccupant, dfa_appoccupant_params>()
                .ForMember(d => d.dfa_appapplicationid, opts => opts.MapFrom(s => s.applicationId))
                .ForMember(d => d.dfa_appoccupantid, opts => opts.MapFrom(s => s.id))
                .ForMember(d => d.dfa_name, opts => opts.MapFrom(s => s.lastName + ", " + s.firstName))
                .ForMember(d => d.dfa_title, opts => opts.MapFrom(s => s.relationship))
                .ForMember(d => d.dfa_firstname, opts => opts.MapFrom(s => s.firstName))
                .ForMember(d => d.dfa_lastname, opts => opts.MapFrom(s => s.lastName))
                .ForMember(d => d.delete, opts => opts.MapFrom(s => s.deleteFlag));

            CreateMap<dfa_appoccupant_retrieve, FullTimeOccupant>()
                .ForMember(d => d.applicationId, opts => opts.MapFrom(s => s._dfa_applicationid_value))
                .ForMember(d => d.id, opts => opts.MapFrom(s => s.dfa_appoccupantid))
                .ForMember(d => d.firstName, opts => opts.MapFrom(s => s.dfa_firstname))
                .ForMember(d => d.lastName, opts => opts.MapFrom(s => s.dfa_lastname))
                .ForMember(d => d.relationship, opts => opts.MapFrom(s => s.dfa_title))
                .ForMember(d => d.deleteFlag, opts => opts.MapFrom(s => false));

            CreateMap<OtherContact, dfa_appothercontact_params>()
                .ForMember(d => d.dfa_appapplicationid, opts => opts.MapFrom(s => s.applicationId))
                .ForMember(d => d.dfa_appothercontactid, opts => opts.MapFrom(s => s.id))
                .ForMember(d => d.dfa_appemailaddress, opts => opts.MapFrom(s => s.email))
                .ForMember(d => d.dfa_firstname, opts => opts.MapFrom(s => s.firstName))
                .ForMember(d => d.dfa_lastname, opts => opts.MapFrom(s => s.lastName))
                .ForMember(d => d.dfa_phonenumber, opts => opts.MapFrom(s => s.phoneNumber))
                .ForMember(d => d.delete, opts => opts.MapFrom(s => s.deleteFlag));

            CreateMap<dfa_appcleanuplogs_retrieve, CleanUpLogItem>()
                .ForMember(d => d.applicationId, opts => opts.MapFrom(s => s._dfa_applicationid_value))
                .ForMember(d => d.id, opts => opts.MapFrom(s => s.dfa_appcleanuplogid))
                .ForMember(d => d.date, opts => opts.MapFrom(s => s.dfa_date))
                .ForMember(d => d.name, opts => opts.MapFrom(s => s.dfa_name))
                .ForMember(d => d.hours, opts => opts.MapFrom(s => s.dfa_hoursworked))
                .ForMember(d => d.description, opts => opts.MapFrom(s => s.dfa_description))
                .ForMember(d => d.deleteFlag, opts => opts.MapFrom(s => false));

            CreateMap<CleanUpLogItem, dfa_appcleanuplogs_params>()
                .ForMember(d => d.dfa_applicationid, opts => opts.MapFrom(s => s.applicationId))
                .ForMember(d => d.dfa_appcleanuplogid, opts => opts.MapFrom(s => s.id))
                .ForMember(d => d.dfa_date, opts => opts.MapFrom(s => s.date))
                .ForMember(d => d.dfa_name, opts => opts.MapFrom(s => s.description))
                .ForMember(d => d.dfa_hoursworked, opts => opts.MapFrom(s => s.hours))
                .ForMember(d => d.dfa_appcontactname, opts => opts.MapFrom(s => s.name))
                .ForMember(d => d.delete, opts => opts.MapFrom(s => s.deleteFlag));

            CreateMap<dfa_appdocumentlocation_retrieve, FileUpload>()
                .ForMember(d => d.applicationId, opts => opts.MapFrom(s => s._dfa_applicationid_value))
                .ForMember(d => d.id, opts => opts.MapFrom(s => s.dfa_appdocumentlocationid))
                .ForMember(d => d.fileName, opts => opts.MapFrom(s => s.dfa_name))
                .ForMember(d => d.fileType, opts => opts.MapFrom(s => ConvertStringToFileCategory(s.dfa_documenttype)))
                .ForMember(d => d.fileDescription, opts => opts.MapFrom(s => s.dfa_documentdescription))
                .ForMember(d => d.uploadedDate, opts => opts.MapFrom(s => s.dfa_uploadeddate))
                .ForMember(d => d.modifiedBy, opts => opts.MapFrom(s => s.dfa_modifiedby))
                //.ForMember(d => d.fileData, opts => opts.MapFrom(s => Encoding.ASCII.GetBytes(s.dfa_filedata)))
                .ForMember(d => d.contentType, opts => opts.MapFrom(s => s.dfa_contenttype))
                .ForMember(d => d.fileSize, opts => opts.MapFrom(s => s.dfa_filesize))
                .ForMember(d => d.deleteFlag, opts => opts.MapFrom(s => false));

            CreateMap<FileUpload, dfa_appdocumentlocation_params>()
                .ForMember(d => d.dfa_applicationid, opts => opts.MapFrom(s => s.applicationId))
                .ForMember(d => d.dfa_appdocumentlocationid, opts => opts.MapFrom(s => s.id))
                .ForMember(d => d.dfa_name, opts => opts.MapFrom(s => s.fileName))
                .ForMember(d => d.dfa_documenttype, opts => opts.MapFrom(s => s.fileType.GetTypeCode()))
                .ForMember(d => d.dfa_documentdescription, opts => opts.MapFrom(s => s.fileDescription))
                .ForMember(d => d.dfa_uploadeddate, opts => opts.MapFrom(s => s.uploadedDate))
                .ForMember(d => d.dfa_modifiedby, opts => opts.MapFrom(s => s.modifiedBy))
                // .ForMember(d => d.dfa_filecontent, opts => opts.MapFrom(s => s.fileData))
                .ForMember(d => d.dfa_contenttype, opts => opts.MapFrom(s => s.contentType))
                .ForMember(d => d.dfa_filesize, opts => opts.MapFrom(s => s.fileSize))
                .ForMember(d => d.delete, opts => opts.MapFrom(s => s.deleteFlag));

            CreateMap<dfa_appapplication, CurrentApplication>()
                .ForMember(d => d.DateOfDamage, opts => opts.MapFrom(s => s.dfa_dateofdamage))
                .ForMember(d => d.ApplicationType, opts => opts.MapFrom(s => GetEnumDescription((ApplicantTypeOptionSet)Convert.ToInt32(s.dfa_applicanttype))))
                .ForMember(d => d.CaseNumber, opts => opts.MapFrom(s => s.dfa_casenumber))
                .ForMember(d => d.EventId, opts => opts.MapFrom(s => s.dfa_event))
                .ForMember(d => d.DamagedAddress, opts => opts.MapFrom(s => string.Join(", ", (new string[] { s.dfa_damagedpropertystreet1, s.dfa_damagedpropertycitytext }).Where(m => !string.IsNullOrEmpty(m)))))
                .ForMember(d => d.ApplicationId, opts => opts.MapFrom(s => s.dfa_appapplicationid));

            CreateMap<dfa_appdamageditems_retrieve, DamagedRoom>()
                .ForMember(d => d.applicationId, opts => opts.MapFrom(s => s._dfa_applicationid_value))
                .ForMember(d => d.id, opts => opts.MapFrom(s => s.dfa_appdamageditemid))
                .ForMember(d => d.roomType, opts => opts.MapFrom(s => ConvertStringToRoomType(s.dfa_roomname)))
                .ForMember(d => d.otherRoomType, opts => opts.MapFrom(s => ConvertStringToRoomType(s.dfa_roomname) == RoomType.Other ? s.dfa_roomname : null))
                .ForMember(d => d.description, opts => opts.MapFrom(s => s.dfa_damagedescription))
                .ForMember(d => d.deleteFlag, opts => opts.MapFrom(s => false));

            CreateMap<DamagedRoom, dfa_appdamageditems_params>()
                .ForMember(d => d.dfa_applicationid, opts => opts.MapFrom(s => s.applicationId))
                .ForMember(d => d.dfa_appdamageditemid, opts => opts.MapFrom(s => s.id))
                .ForMember(d => d.dfa_roomname, opts => opts.MapFrom(s => s.roomType == RoomType.Family ? "Family" :
                        (s.roomType == RoomType.Laundry ? "Laundry" :
                        (s.roomType == RoomType.Garage ? "Garage" :
                        (s.roomType == RoomType.Other ? "Other" :
                        (s.roomType == RoomType.Kitchen ? "Kitchen" :
                        (s.roomType == RoomType.Bathroom ? "Bathroom" :
                        (s.roomType == RoomType.Bedroom ? "Bedroom" :
                        (s.roomType == RoomType.Dining ? "Dining" :
                        (s.roomType == RoomType.Living ? "Living" : "Other"))))))))))
                .ForMember(d => d.dfa_damagedescription, opts => opts.MapFrom(s => s.description))
                .ForMember(d => d.delete, opts => opts.MapFrom(s => s.deleteFlag));
        }

        public FileCategory ConvertStringToFileCategory(string documenttype)
        {
            FileCategory fileCategory = FileCategory.Unknown;

            if (System.Enum.TryParse(documenttype, out fileCategory)) return fileCategory;
            else return FileCategory.Unknown;
        }

        public RoomType ConvertStringToRoomType(string roomname)
        {
            RoomType roomType = RoomType.Other;

            if (System.Enum.TryParse(roomname, out roomType)) return roomType;
            else return RoomType.Other;
        }

        public static string GetEnumDescription(System.Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes = fi.GetCustomAttributes(typeof(DescriptionAttribute), false) as DescriptionAttribute[];

            if (attributes != null && attributes.Any())
            {
                return attributes.First().Description;
            }

            return value.ToString();
        }
    }
}
