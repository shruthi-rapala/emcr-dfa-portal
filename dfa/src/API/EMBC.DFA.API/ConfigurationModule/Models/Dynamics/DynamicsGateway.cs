using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using EMBC.ESS.Shared.Contracts.Metadata;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Org.BouncyCastle.Asn1.Mozilla;
using Xrm.Tools.WebAPI;
using Xrm.Tools.WebAPI.Requests;
using static System.Net.Mime.MediaTypeNames;

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
                        "dfa_isprimaryandsecondaryaddresssame", "dfa_appcontactid",
                        "dfa_bcservicecardid"
                    },
                    Filter = $"dfa_bcservicecardid eq '{userId}'"
                });

                return userObj != null ? userObj.List.LastOrDefault() : null;
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
                return Guid.Empty.ToString();
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
                return Guid.Empty.ToString();
                //  throw new Exception($"Failed to update application {ex.Message}", ex);
            }

            return string.Empty;
        }
        public async Task<dfa_appapplicationstart> GetApplicationStartById(string applicationId)
        {
            var list = await api.GetList<dfa_appapplicationstart>("dfa_appapplications", new CRMGetListOptions
            {
                Select = new[]
                {
                    "dfa_appapplicationid", "dfa_applicanttype", "dfa_doyouhaveinsurancecoverage2", "dfa_applicant.dfa_appcontactid", "dfa_primaryapplicantisignednoins",
                    "dfa_primaryapplicantprintnamenoins", "dfa_primaryapplicantsigneddatenoins", "entityimagenoins", "dfa_secondaryapplicantsignednoins",
                    "dfa_secondaryapplicantprintnamenoins", "dfa_secondaryapplicantsigneddatenoins", "secondaryentityimagenoins"
                },
                Filter = "_dfa_appapplicationid_value eq {applicationId}"
            });

            return list.List.FirstOrDefault();
        }

        public async Task<dfa_appapplicationmain> GetApplicationMainById(string applicationId)
        {
            var list = await api.GetList<dfa_appapplicationmain>("dfa_appapplications", new CRMGetListOptions
            {
                // TODO Update list of fields
                Select = new[]
                {
                    "dfa_appapplicationid", "dfa_isprimaryanddamagedaddresssame", "dfa_damagedpropertystreet1", "dfa_damagedpropertystreet2",
                    "dfa_damagedpropertycitytext", "dfa_damagedpropertyprovince", "dfa_damagedpropertypostalcode", "dfa_isthispropertyyourp",
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
                },
                Filter = "_dfa_appapplicationid_value eq {applicationId}"
            });

            return list.List.FirstOrDefault();
        }

        public async Task<IEnumerable<dfa_appapplication>> GetApplicationListAsync(string profileId)
        {
            try
            {
                var list = await api.GetList<dfa_appapplication>("dfa_appapplications", new CRMGetListOptions
                {
                    Select = new[] { "dfa_appapplicationid", "dfa_applicanttype" },
                    Filter = $"_dfa_applicant_value eq {profileId}"
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to obtain access token from {ex.Message}", ex);
            }
        }

        // TODO: fails with a message about Guid not formulated correctly
        public async Task<string> UpsertDeleteDamagedItemAsync(dfa_appdamageditems_params objDamagedItems)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_DFAPortalCreateAppDamagedItem", objDamagedItems); // TODO correct name parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            // catch (System.Exception ex)
            catch
            {
                return Guid.Empty.ToString();
                // throw new Exception($"Failed to update damaged items {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appdamageditems_retrieve>> GetDamagedItemsListAsync(Guid applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appdamageditems_retrieve>("dfa_appdamageditems", new CRMGetListOptions
                {
                    Select = new[] { "_dfa_applicationid_value", "dfa_appdamageditemid", "dfa_roomname", "dfa_damagedescription" },
                    Filter = $"_dfa_applicationid_value eq {applicationId}"
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get damaged items {ex.Message}", ex);
            }
        }

        // TODO: Dynamics endpoint fails with Message='dfa_appsecondaryapplicant' entity doesn't contain attribute with Name = 'dfa_emailaddress ' and NameMapping = 'Logical'.
        public async Task<string> UpsertDeleteSecondaryApplicantAsync(dfa_appsecondaryapplicant_params objSecondaryApplicant)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_DFAPortalAppSecondaryApplicant", objSecondaryApplicant); // TODO correct name parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            catch (System.Exception ex)
            {
                // return Guid.Empty.ToString();
                throw new Exception($"Failed to update secondary applicant {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appsecondaryapplicant_retrieve>> GetSecondaryApplicantsListAsync(Guid applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appsecondaryapplicant_retrieve>("dfa_appsecondaryapplicants", new CRMGetListOptions // TODO by application Id
                {
                    Select = new[]
                    {
                        "_dfa_appapplicationid_value", "dfa_appsecondaryapplicantid", "dfa_applicanttype", "dfa_emailaddress",
                        "dfa_firstname", "dfa_lastname", "dfa_phonenumber"
                    },
                    Filter = $"_dfa_appapplicationid_value eq {applicationId}"
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get secondary applicants {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteOtherContactAsync(dfa_appothercontact_params objOtherContact)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_DFAPortalCreateOtherContact", objOtherContact); // TODO correct name and parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return Guid.Empty.ToString();
                //  throw new Exception($"Failed to update other contact {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appothercontact_retrieve>> GetOtherContactsListAsync(Guid applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appothercontact_retrieve>("dfa_appothercontacts", new CRMGetListOptions // TODO by applciation id
                {
                    Select = new[]
                    {
                        "_dfa_appapplicationid_value", "dfa_appothercontactid", "dfa_emailaddress", "dfa_firstname",
                        "dfa_lastname", "dfa_phonenumber", "dfa_name"
                    },
                    Filter = $"_dfa_appapplicationid_value eq {applicationId}"
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get other contacts {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteFullTimeOccupantAsync(dfa_appoccupant_params objAppOccupant)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_DFAPortalCreateAppOccupant", objAppOccupant); // TODO correct name and parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return Guid.Empty.ToString();
                //  throw new Exception($"Failed to update full time occupant {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appoccupant_retrieve>> GetFullTimeOccupantsListAsync(Guid applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appoccupant_retrieve>("dfa_appoccupants", new CRMGetListOptions
                {
                    Select = new[]
                    {
                        "_dfa_applicationid_value", "dfa_appoccupantid", "_dfa_contactid_value", "dfa_name"
                    },
                    Filter = $"_dfa_applicationid_value eq {applicationId}"
                });

                foreach (dfa_appoccupant_retrieve item in list.List)
                {
                    var contactList = await api.GetList<dfa_appcontact>("dfa_appcontacts", new CRMGetListOptions
                    {
                        Select = new[]
                        {
                            "dfa_appcontactid", "dfa_firstname", "dfa_lastname", "dfa_title"
                        },
                        Filter = $"dfa_appcontactid eq {item._dfa_contactid_value}"
                    });

                    if (contactList != null)
                    {
                        item.dfa_title = contactList.List.Last().dfa_title;
                        item.dfa_firstname = contactList.List.Last().dfa_firstname;
                        item.dfa_lastname = contactList.List.Last().dfa_lastname;
                    }
                }

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get full time occupants {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteCleanUpLogItemAsync(dfa_appcleanuplogs_params objCleanUpLog)
        {
            try
            {
                System.Dynamic.ExpandoObject result = new System.Dynamic.ExpandoObject();
                if (objCleanUpLog.dfa_appcleanuplogid == null)
                {
                    result = await api.ExecuteAction("dfa_DFAPortalCreateAppCleanupLog", objCleanUpLog);
                }
                else
                {
                    result = await api.ExecuteAction("dfa_appcleanuplogs", objCleanUpLog); // TODO correct name and parms
                }

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return Guid.Empty.ToString();
                //  throw new Exception($"Failed to update clean up log item {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appcleanuplogs_retrieve>> GetCleanUpLogItemsListAsync(Guid applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appcleanuplogs_retrieve>("dfa_appcleanuplogs", new CRMGetListOptions
                {
                    Select = new[]
                    {
                        "_dfa_applicationid_value", "dfa_appcleanuplogid", "dfa_name", "dfa_date", "dfa_hoursworked", "_dfa_contactid_value"
                    },
                    Filter = $"_dfa_applicationid_value eq {applicationId}"
                });

                foreach (var item in list.List)
                {
                    item.dfa_description = item.dfa_name; // name from cleanup logs entity is description of work
                    var contactList = await api.GetList<dfa_appcontact>("dfa_appcontacts", new CRMGetListOptions
                    {
                        Select = new[]
                        {
                            "dfa_name"
                        },
                        Filter = $"dfa_appcontactid eq {item._dfa_contactid_value}"
                    });

                    if (contactList != null)
                    {
                        item.dfa_name = contactList.List.Last().dfa_name;
                    }
                }

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get clean up log items {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteDocumentLocationAsync(dfa_appdocumentlocation_params objDocumentLocation)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_appdocumentlocation", objDocumentLocation); // TODO correct name and parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return Guid.Empty.ToString();
                //  throw new Exception($"Failed to update document location {ex.Message}", ex);
            }

            return string.Empty;
        }

        // TODO : fails
        public async Task<IEnumerable<dfa_appdocumentlocation_retrieve>> GetDocumentLocationsListAsync(Guid applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appdocumentlocation_retrieve>("dfa_appdocumentlocations", new CRMGetListOptions
                {
                    Select = new[]
                    {
                        "_dfa_applicationid_value", "dfa_appdocumentlocationid", "dfa_name", "dfa_documenttype", "dfa_documentdescription",
                        "dfa_uploadeddate", "dfa_modifiedby", "dfa_filedata", "dfa_contenttype", "dfa_filesize"
                    },
                    Filter = $"_dfa_applicationid_value eq {applicationId}"
                });

                return list.List;
            }
            // catch (System.Exception ex)
            catch
            {
                return null;
                // throw new Exception($"Failed to get document locations {ex.Message}", ex);
            }
        }
    }
}
