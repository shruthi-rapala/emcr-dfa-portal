using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EMBC.ESS.Shared.Contracts.Metadata;
using Google.Protobuf.WellKnownTypes;
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
                },
                Filter = "dfa_appapplicationid = " + applicationId
            });

            return list.List.FirstOrDefault();
        }

        public async Task<IEnumerable<dfa_appapplication>> GetApplicationListAsync(string profileId)
        {
            try
            {
                var lstEvents = await api.GetList<dfa_event>("dfa_events", new CRMGetListOptions
                {
                    Select = new[]
                    {
                        "dfa_eventid", "dfa_id"
                    }
                });

                var lstCases = await api.GetList<dfa_incident>("incidents", new CRMGetListOptions
                {
                    Select = new[]
                    {
                        "incidentid", "ticketnumber"
                    }
                });

                var list = await api.GetList<dfa_appapplication>("dfa_appapplications", new CRMGetListOptions
                {
                    Select = new[]
                    {
                        "dfa_appapplicationid", "dfa_applicanttype",
                        "dfa_dateofdamage", "dfa_damagedpropertystreet1", "dfa_damagedpropertycitytext", "_dfa_eventid_value", "_dfa_casecreatedid_value"
                    },
                    Filter = $"_dfa_applicant_value eq {profileId}"
                    //Expand = new CRMExpandOptions[]
                    //{
                    //    new CRMExpandOptions()
                    //    {
                    //        Property = "_dfa_eventid_value",
                    //        Select = new string[] { "dfa_eventid", "dfa_id" }
                    //    }
                    //}
                });

                var lstApps = (from objApp in list.List
                            from objEvent in lstEvents.List
                            where objEvent.dfa_eventid == objApp._dfa_eventid_value
                            from objCase in lstCases.List
                            where objCase.incidentid == objApp._dfa_casecreatedid_value
                            select new dfa_appapplication
                            {
                                dfa_appapplicationid = objApp.dfa_appapplicationid,
                                dfa_applicanttype = objApp.dfa_applicanttype,
                                dfa_dateofdamage = objApp.dfa_dateofdamage,
                                dfa_damagedpropertystreet1 = objApp.dfa_damagedpropertystreet1,
                                dfa_damagedpropertycitytext = objApp.dfa_damagedpropertycitytext,
                                dfa_event = objEvent.dfa_id,
                                dfa_casenumber = objCase.ticketnumber
                            }).AsEnumerable();

                return lstApps;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to obtain access token from {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteDamagedItemAsync(dfa_damageditems objDamagedItems)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_appdamageditem", objDamagedItems); // TODO correct name parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return "updateddamageditems";
                //  throw new Exception($"Failed to update damaged items {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_damageditems>> GetDamagedItemsListAsync(string applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_damageditems>("dfa_damageditems", new CRMGetListOptions
                {
                    Select = new[] { "dfa_applicationid", "dfa_appdamageditemid", "dfa_roomname", "dfa_damagedescription" } // TODO for application id
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get damaged items {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteSecondaryApplicantAsync(dfa_appsecondaryapplicant objSecondaryApplicant)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_appsecondaryapplicant", objSecondaryApplicant); // TODO correct name parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return "updatedsecondaryapplicant";
                //  throw new Exception($"Failed to update secondary applicant {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appsecondaryapplicant>> GetSecondaryApplicantsListAsync(string applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appsecondaryapplicant>("dfa_appsecondaryapplicant", new CRMGetListOptions // TODO by application Id
                {
                    Select = new[]
                    {
                        "dfa_appapplicationid", "dfa_appsecondaryapplicantid", "dfa_applicanttype", "dfa_emailaddress",
                        "dfa_firstname", "dfa_lastname", "dfa_phonenumber"
                    }
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get secondary applicants {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteOtherContactAsync(dfa_othercontact objOtherContact)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_othercontact", objOtherContact); // TODO correct name and parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return "updatedothercontact";
                //  throw new Exception($"Failed to update other contact {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_othercontact>> GetOtherContactsListAsync(string applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_othercontact>("dfa_othercontact", new CRMGetListOptions // TODO by applciation id
                {
                    Select = new[]
                    {
                        "dfa_appapplicationid", "dfa_appothercontactid", "dfa_appemailaddress", "dfa_firstname",
                        "dfa_lastname", "dfa_phonenumber"
                    }
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get other contacts {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteFullTimeOccupantAsync(dfa_appoccupant objAppOccupant)
        {
            try
            {
                var result = await api.ExecuteAction("dfa_appoccupant", objAppOccupant); // TODO correct name and parms

                if (result != null)
                {
                    return result.Where(m => m.Key == "output") != null ? result.Where(m => m.Key == "output").ToList()[0].Value.ToString() : string.Empty;
                }
            }
            //catch (System.Exception ex)
            catch
            {
                return "updatedfulltimeoccupant";
                //  throw new Exception($"Failed to update full time occupant {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appoccupant>> GetFullTimeOccupantsListAsync(string applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appoccupant>("dfa_appoccupant", new CRMGetListOptions // TODO by applciation id
                {
                    Select = new[]
                    {
                        "dfa_appapplicationid", "dfa_appoccupantid", "dfa_contactid", "dfa_name", "dfa_title",
                        "dfa_firstname", "dfa_lastname"
                    }
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get full time occupants {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteCleanUpLogItemAsync(dfa_appcleanuplogs objCleanUpLog)
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
                return "updatedcleanuplogitem";
                //  throw new Exception($"Failed to update clean up log item {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appcleanuplogs>> GetCleanUpLogItemsListAsync(string applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appcleanuplogs>("dfa_appcleanuplogs", new CRMGetListOptions // TODO by applciation id
                {
                    Select = new[]
                    {
                        "dfa_appapplicationid", "dfa_appcleanuplogid", "dfa_name", "dfa_date", "dfa_hoursworked",
                        "dfa_description"
                    }
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get clean up log items {ex.Message}", ex);
            }
        }

        public async Task<string> UpsertDeleteDocumentLocationAsync(dfa_appdocumentlocation objDocumentLocation)
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
                return "updateddocumentlocation";
                //  throw new Exception($"Failed to update document location {ex.Message}", ex);
            }

            return string.Empty;
        }

        public async Task<IEnumerable<dfa_appdocumentlocation>> GetDocumentLocationsListAsync(string applicationId)
        {
            try
            {
                var list = await api.GetList<dfa_appdocumentlocation>("dfa_appdocumentlocation", new CRMGetListOptions // TODO by applciation id
                {
                    Select = new[]
                    {
                        "dfa_appapplicationid", "dfa_appdocumentlocationid", "dfa_name", "dfa_documenttype", "dfa_documentdescription",
                        "dfa_uploadeddate", "dfa_modifiedby", "dfa_filedata", "dfa_contenttype", "dfa_filesize"
                    }
                });

                return list.List;
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Failed to get document locations {ex.Message}", ex);
            }
        }
    }
}
