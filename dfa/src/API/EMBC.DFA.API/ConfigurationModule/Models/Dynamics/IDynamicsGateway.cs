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
        Task<IEnumerable<dfa_appapplication>> GetApplicationListAsync();
        Task<IEnumerable<dfa_damageditems>> GetDamagedItemsListAsync(string applicationId);
        Task<string> UpsertDeleteDamagedItemAsync(dfa_damageditems objDamagedItems);
        Task<string> UpsertDeleteSecondaryApplicantAsync(dfa_appsecondaryapplicant objSecondaryApplicant);
        Task<IEnumerable<dfa_appsecondaryapplicant>> GetSecondaryApplicantsListAsync(string applicationId);
        Task<string> UpsertDeleteOtherContactAsync(dfa_othercontact objOtherContact);
        Task<IEnumerable<dfa_othercontact>> GetOtherContactsListAsync(string applicationId);
        Task<string> UpsertDeleteFullTimeOccupantAsync(dfa_appoccupant objAppOccupant);
        Task<IEnumerable<dfa_appoccupant>> GetFullTimeOccupantsListAsync(string applicationId);
        Task<string> UpsertDeleteCleanUpLogItemAsync(dfa_appcleanuplogs objCleanUpLog);
        Task<IEnumerable<dfa_appcleanuplogs>> GetCleanUpLogItemsListAsync(string applicationId);
        Task<string> UpsertDeleteDocumentLocationAsync(dfa_appdocumentlocation objDocumentLocation);
        Task<IEnumerable<dfa_appdocumentlocation>> GetDocumentLocationsListAsync(string applicationId);

        //Task<IEnumerable> GetDistrictsAsync();

        //Task<IEnumerable<JurisdictionEntity>> GetJurisdictionsAsync();

        //Task<IEnumerable<JurisdictionEntity>> GetJurisdictionsAsync(string stateProvinceId);

        //Task<IEnumerable> GetRegionsAsync();

        //Task<IEnumerable<StateProvinceEntity>> GetStateProvincesAsync();

        //Task<IEnumerable<StateProvinceEntity>> GetStateProvincesAsync(string countryId);

        //Task<IEnumerable<SupportEntity>> GetSupportsAsync();
    }
}
