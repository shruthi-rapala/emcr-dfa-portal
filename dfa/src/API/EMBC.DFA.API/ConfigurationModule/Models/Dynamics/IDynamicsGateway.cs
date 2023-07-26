using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Google.Protobuf.WellKnownTypes;
using Xrm.Tools.WebAPI.Requests;

namespace EMBC.DFA.API.ConfigurationModule.Models.Dynamics
{
    public interface IDynamicsGateway
    {
        Task<IEnumerable<Country>> GetCountriesAsync();
        Task<IEnumerable<dfa_appcontact>> GetContactsAsync();
        Task<dfa_appcontact> GetUserProfileAsync(string userId);
        Task<string> AddContact(dfa_appcontact contact);
        Task<string> AddApplication(dfa_appapplicationstart application);
        Task<string> UpdateApplication(dfa_appapplicationmain application);
        Task<dfa_appapplicationstart> GetApplicationStartById(string applicationId);
        Task<dfa_appapplicationmain> GetApplicationMainById(string applicationId);
        Task<IEnumerable<dfa_appdamageditems_retrieve>> GetDamagedItemsListAsync(Guid applicationId);
        Task<string> UpsertDeleteDamagedItemAsync(dfa_appdamageditems_params objDamagedItems);
        Task<string> UpsertDeleteSecondaryApplicantAsync(dfa_appsecondaryapplicant_params objSecondaryApplicant);
        Task<IEnumerable<dfa_appsecondaryapplicant_retrieve>> GetSecondaryApplicantsListAsync(Guid applicationId);
        Task<string> UpsertDeleteOtherContactAsync(dfa_appothercontact_params objOtherContact);
        Task<IEnumerable<dfa_appothercontact_retrieve>> GetOtherContactsListAsync(Guid applicationId);
        Task<string> UpsertDeleteFullTimeOccupantAsync(dfa_appoccupant_params objAppOccupant);
        Task<IEnumerable<dfa_appoccupant_retrieve>> GetFullTimeOccupantsListAsync(Guid applicationId);
        Task<string> UpsertDeleteCleanUpLogItemAsync(dfa_appcleanuplogs_params objCleanUpLog);
        Task<IEnumerable<dfa_appcleanuplogs_retrieve>> GetCleanUpLogItemsListAsync(Guid applicationId);
        Task<string> UpsertDeleteDocumentLocationAsync(dfa_appdocumentlocation_params objDocumentLocation);
        Task<IEnumerable<dfa_appdocumentlocation_retrieve>> GetDocumentLocationsListAsync(Guid applicationId);
        Task<IEnumerable<dfa_appapplication>> GetApplicationListAsync(string profileId);

        //Task<IEnumerable> GetDistrictsAsync();

        //Task<IEnumerable<JurisdictionEntity>> GetJurisdictionsAsync();

        //Task<IEnumerable<JurisdictionEntity>> GetJurisdictionsAsync(string stateProvinceId);

        //Task<IEnumerable> GetRegionsAsync();

        //Task<IEnumerable<StateProvinceEntity>> GetStateProvincesAsync();

        //Task<IEnumerable<StateProvinceEntity>> GetStateProvincesAsync(string countryId);

        //Task<IEnumerable<SupportEntity>> GetSupportsAsync();
    }
}
