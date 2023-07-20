using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EMBC.ESS.Shared.Contracts.Metadata;
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

        public async Task<dfa_appcontact> GetUserProfileAsync(string userId)
        {
            try
            {
                var userObj = await api.GetList<dfa_appcontact>("dfa_appcontacts", new CRMGetListOptions
                {
                    Select = new[]
                    {
                        "dfa_firstname", "dfa_lastname", "dfa_initial",
                        "dfa_isindigenous", "dfa_emailaddress", "dfa_cellphonenumber",
                        "dfa_residencetelephonenumber", "dfa_alternatephonenumber", "dfa_primaryaddressline1",
                        "dfa_primaryaddressline2", "dfa_primarycity", "dfa_primarypostalcode",
                        "dfa_primarystateprovince", "dfa_secondaryaddressline1", "dfa_secondaryaddressline2",
                        "dfa_secondarycity", "dfa_secondarypostalcode", "dfa_secondarystateprovince",
                        //"dfa_isprimaryandsecondaryaddresssame",
                        "dfa_bcservicecardid"
                    },
                    Filter = $"dfa_bcservicecardid eq '{userId}'"
                });

                return userObj != null ? userObj.List.FirstOrDefault() : null;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to obtain access token from {ex.Message}", ex);
            }
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
            //catch (System.Exception ex)
            catch
            {
                return "anewapplication";
              //  throw new Exception($"Failed to add application {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<string> UpdateApplication(dfa_appapplicationmain application)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_DFAPortalUpdateApplication", application);

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return "updatedapplication";
                //  throw new Exception($"Failed to update application {ex.Message}", ex);
            }

            return string.Empty;
        }
        public async Task<dfa_appapplicationstart> GetApplicationStartById(string applicationId)
        {
            var list = await api.GetList<dfa_appapplicationstart>("dfa_appapplications(" + applicationId + ")", new CRMGetListOptions
            {
                Select = new[]
                {
                    "dfa_appapplicationid", "dfa_applicanttype", "dfa_doyouhaveinsurancecoverage2", "dfa_applicant.dfa_appcontactid", "dfa_primaryapplicantisignednoins",
                    "dfa_primaryapplicantprintnamenoins", "dfa_primaryapplicantsigneddatenoins", "entityimagenoins", "dfa_secondaryapplicantsignednoins",
                    "dfa_secondaryapplicantprintnamenoins", "dfa_secondaryapplicantsigneddatenoins", "secondaryentityimagenoins"
                }
            });

            return list.List.FirstOrDefault();
        }

        public async Task<dfa_appapplicationmain> GetApplicationMainById(string applicationId)
        {
            var list = await api.GetList<dfa_appapplicationmain>("dfa_appapplications(" + applicationId + ")", new CRMGetListOptions
            {
                // TODO Update list of fields
                Select = new[]
                {
                    "dfa_appapplicationid", "dfa_isprimaryanddamagedaddresssame", "dfa_damagedpropertystreet1", "dfa_damagedpropertystreet2",
                    "dfa_damagedpropertycity", "dfa_damagedpropertyprovince", "dfa_damagedpropertypostalcode", "dfa_isthispropertyyourp",
                    "dfa_indigenousreserve", "dfa_nameoffirstnationsr", "dfa_manufacturedhom", "dfa_eligibleforbchomegrantonthisproperty",
                    "dfa_appbuildingownerlandlord.dfa_contactfirstname", "dfa_appbuildingownerlandlord.dfa_contactlastname",
                    "dfa_appbuildingownerlandlord.dfa_contactphone1", "dfa_appbuildingownerlandlord.dfa_contactemail",
                    "dfa_acopyofarentalagreementorlease", "dfa_areyounowresidingintheresidence", "dfa_causeofdamageflood",
                    "dfa_causeofdamagestorm", "dfa_causeofdamagewildfire", "dfa_causeofdamagelandslide", "dfa_causeofdamageother",
                    "dfa_causeofdamageloss", "dfa_dateofdamage", "dfa_dateofdamageto", "dfa_dateofreturntotheresidence",
                    "dfa_description", "dfa_doyourlossestotalmorethan1000", "dfa_haveinvoicesreceiptsforcleanuporrepairs",
                    "dfa_primaryapplicantprintname", "dfa_primaryapplicantsigned", "dfa_primaryapplicantsigneddate",
                    "dfa_primaryapplicantsignature", "dfa_secondaryyapplicantprintname", "dfa_secondaryapplicantsigned",
                    "dfa_secondaryapplicantsigneddate", "dfa_secondaryapplicantsignature"
                }
            });

            return list.List.FirstOrDefault();
        }
        public async Task<IEnumerable<dfa_appapplication>> GetApplicationListAsync()
        {
            try
            {
                var list = await api.GetList<dfa_appapplication>("dfa_appapplications", new CRMGetListOptions
                {
                    Select = new[] { "dfa_appapplicationid", "dfa_applicanttype" }
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to obtain access token from {ex.Message}", ex);
            }
        }
    }
}
