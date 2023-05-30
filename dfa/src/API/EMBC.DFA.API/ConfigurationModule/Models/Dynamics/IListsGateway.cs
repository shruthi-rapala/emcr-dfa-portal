using System.Collections.Generic;
using System.Threading.Tasks;

namespace EMBC.DFA.API.ConfigurationModule.Models.Dynamics
{
    public interface IListsGateway
    {
        Task<IEnumerable<Country>> GetCountriesAsync();

        //Task<IEnumerable> GetDistrictsAsync();

        //Task<IEnumerable<JurisdictionEntity>> GetJurisdictionsAsync();

        //Task<IEnumerable<JurisdictionEntity>> GetJurisdictionsAsync(string stateProvinceId);

        //Task<IEnumerable> GetRegionsAsync();

        //Task<IEnumerable<StateProvinceEntity>> GetStateProvincesAsync();

        //Task<IEnumerable<StateProvinceEntity>> GetStateProvincesAsync(string countryId);

        //Task<IEnumerable<SupportEntity>> GetSupportsAsync();
    }
}
