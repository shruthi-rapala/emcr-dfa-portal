using System;
using System.Collections.Generic;
using System.Linq;
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
            try
            {
                var result = await api.ExecuteAction("dfa_DFAPortalCreateProfile", contact);

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to add contact {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<string> AddApplication(dfa_appapplicationstart application)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_DFAPortalCreateApplication", application);

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to add application {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<dfa_appapplicationstart> GetApplicationStartById(string applicationId)
        {
            var list = await api.GetList<dfa_appapplicationstart>("dfa_appapplications(" + applicationId + ")", new CRMGetListOptions
            {
                Select = new[]
                {
                    "dfa_applicanttype", "dfa_doyouhaveinsurancecoverage2", "dfa_applicant.dfa_appcontactid", "dfa_primaryapplicantisignednoins",
                    "dfa_primaryapplicantprintnamenoins", "dfa_primaryapplicantsigneddatenoins", "entityimagenoins", "dfa_secondaryapplicantsignednoins",
                    "dfa_secondaryapplicantprintnamenoins", "dfa_secondaryapplicantsigneddatenoins", "secondaryentityimagenoins"
                }
            });

            return list.List.FirstOrDefault();
        }
    }
}
