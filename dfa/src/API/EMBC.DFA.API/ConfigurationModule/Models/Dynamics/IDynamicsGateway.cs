using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;

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

        //Task<IEnumerable> GetDistrictsAsync();

        //Task<IEnumerable<JurisdictionEntity>> GetJurisdictionsAsync();

        //Task<IEnumerable<JurisdictionEntity>> GetJurisdictionsAsync(string stateProvinceId);

        //Task<IEnumerable> GetRegionsAsync();

        //Task<IEnumerable<StateProvinceEntity>> GetStateProvincesAsync();

        //Task<IEnumerable<StateProvinceEntity>> GetStateProvincesAsync(string countryId);

        //Task<IEnumerable<SupportEntity>> GetSupportsAsync();
    }
}
