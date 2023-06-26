using System.Collections.Generic;
using System.Threading.Tasks;
using Xrm.Tools.WebAPI;
using Xrm.Tools.WebAPI.Requests;

namespace EMBC.DFA.API.ConfigurationModule.Models.Dynamics
{
    public class DynamicsGateway : IDynamicsGateway
    {
        private readonly CRMWebAPI api;

        public DynamicsGateway(CRMWebAPI api)
        {
            this.api = api;
        }

        public async Task<IEnumerable<dfa_appcontact>> GetContactsAsync()
        {
            var list = await api.GetList<dfa_appcontact>("dfa_appcontacts", new CRMGetListOptions
            {
                Select = new[] { "dfa_firstname", "dfa_lastname", "dfa_initial" }
            });

            return list.List;
        }

        public async Task<IEnumerable<Country>> GetCountriesAsync()
        {
            var list = await api.GetList<Country>("era_countries", new CRMGetListOptions
            {
                Select = new[] { "era_countrycode", "era_countryid", "era_isocountrycode", "era_name" }
            });

            return list.List;
        }

        public async Task<string> AddContact(dfa_appcontact contact)
        {
            dynamic result = await api.ExecuteAction("dfa_appcontacts", contact);

            return string.Empty;
        }
    }
}
