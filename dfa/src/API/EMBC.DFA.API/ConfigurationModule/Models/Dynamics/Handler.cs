using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cronos;
using EMBC.DFA.API.Controllers;
using EMBC.DFA.API.Mappers;
using EMBC.Utilities.Caching;
using Microsoft.Extensions.Logging;
using Xrm.Tools.WebAPI;
using Xrm.Tools.WebAPI.Requests;
using static Pipelines.Sockets.Unofficial.SocketConnection;
using Profile = EMBC.DFA.API.Controllers.Profile;

namespace EMBC.DFA.API.ConfigurationModule.Models.Dynamics
{
    public interface IConfigurationHandler
    {
        Task<IEnumerable<Contact>> Handle();
        Task<Profile> HandleGetUser(string userID);
        Task<IEnumerable<Country>> HandleCountry();
        Task<string> HandleContact(dfa_appcontact objContact);
        Task<string> HandleApplication(dfa_appapplicationstart objApplication);
        Task<string> HandleApplicationUpdate(dfa_appapplicationmain objApplication);
        Task<dfa_appapplicationstart> GetApplicationStartAsync(string applicationId);
        Task<dfa_appapplicationmain> GetApplicationMainAsync(string applicationId);
        Task<string> HandleDamagedItemsAsync(dfa_appdamageditems_params objDamagedItems);
        Task<IEnumerable<dfa_appdamageditems_retrieve>> GetDamagedItemsAsync(Guid applicationId);
        Task<string> HandleSecondaryApplicantAsync(dfa_appsecondaryapplicant_params objSecondaryApplicants);
        Task<IEnumerable<dfa_appsecondaryapplicant_retrieve>> GetSecondaryApplicantsAsync(Guid applicationId);
        Task<string> HandleOtherContactAsync(dfa_appothercontact_params objOtherContact);
        Task<IEnumerable<dfa_appothercontact_retrieve>> GetOtherContactsAsync(Guid applicationId);
        Task<string> HandleFullTimeOccupantAsync(dfa_appoccupant_params objAppOccupant);
        Task<IEnumerable<dfa_appoccupant_retrieve>> GetFullTimeOccupantsAsync(Guid applicationId);
        Task<string> HandleCleanUpLogItemAsync(dfa_appcleanuplogs_params objCleanUpLogItem);
        Task<IEnumerable<dfa_appcleanuplogs_retrieve>> GetCleanUpLogItemsAsync(Guid applicationId);
        Task<string> HandleFileUploadAsync(dfa_appdocumentlocation_params objFileUpload);
        Task<IEnumerable<dfa_appdocumentlocation_retrieve>> GetFileUploadsAsync(Guid applicationId);
        Task<IEnumerable<dfa_appapplication>> HandleApplicationList(string profileId);
    }

    public class Handler : IConfigurationHandler
    {
        //private readonly CRMWebAPI api;
        //private readonly IListsRepository listsRepository;
        private readonly ICache cache;
        private readonly IDynamicsGateway listsGateway;
        private AutoMapper.MapperConfiguration mapperConfig;
        private AutoMapper.IMapper mapper => mapperConfig.CreateMapper();

        public Handler(ICache cache,
            IDynamicsGateway listsGateway)
        {
            this.cache = cache;
            this.listsGateway = listsGateway;
            mapperConfig = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddMaps(typeof(Mappings));
            });
        }

        public async Task<IEnumerable<Contact>> Handle()
        {
            try
            {
                var contacts = await listsGateway.GetContactsAsync();
                //var lst = mapper.Map<IEnumerable<Contact>>(contacts);
                return contacts.Select(c => new Contact
                {
                    FirstName = c.dfa_firstname,
                    LastName = c.dfa_lastname,
                    //Initial = c.dfa_initial,
                    //Email = c.dfa_emailaddress,
                    //Mobile = c.dfa_cellphonenumber,
                    //ResidencePhone = c.dfa_residencetelephonenumber,
                    //AlternatePhone = c.dfa_alternatephonenumber
                }).OrderBy(c => c.FirstName);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<Country>> HandleCountry()
        {
            //await cache.Refresh("countries", listsGateway.GetCountriesAsync, TimeSpan.FromDays(1));
            return await listsGateway.GetCountriesAsync();
        }

        public async Task<Profile> HandleGetUser(string userID)
        {
            var objUser = await listsGateway.GetUserProfileAsync(userID);
            var mappedProfile = mapper.Map<Profile>(objUser);
            return mappedProfile;
        }

        public async Task<string> HandleContact(dfa_appcontact objContact)
        {
            var contactId = await listsGateway.AddContact(objContact);
            return contactId;
        }

        public async Task<string> HandleApplication(dfa_appapplicationstart objApplication)
        {
            var applicationId = await listsGateway.AddApplication(objApplication);
            return applicationId;
        }

        public async Task<string> HandleApplicationUpdate(dfa_appapplicationmain objApplication)
        {
            var applicationId = await listsGateway.UpdateApplication(objApplication);
            return applicationId;
        }

        public async Task<dfa_appapplicationstart> GetApplicationStartAsync(string applicationId)
        {
            var dfa_appapplication = await listsGateway.GetApplicationStartById(applicationId);
            return dfa_appapplication;
        }
        public async Task<dfa_appapplicationmain> GetApplicationMainAsync(string applicationId)
        {
            var dfa_appapplication = await listsGateway.GetApplicationMainById(applicationId);
            return dfa_appapplication;
        }

        public async Task<IEnumerable<dfa_appapplication>> HandleApplicationList(string profileId)
        {
            return await listsGateway.GetApplicationListAsync(profileId);
        }

        public async Task<string> HandleDamagedItemsAsync(dfa_appdamageditems_params objDamagedItems)
        {
            var dfa_appdamageitemid = await listsGateway.UpsertDeleteDamagedItemAsync(objDamagedItems);
            return dfa_appdamageitemid;
        }

        public async Task<IEnumerable<dfa_appdamageditems_retrieve>> GetDamagedItemsAsync(Guid applicationId)
        {
            return await listsGateway.GetDamagedItemsListAsync(applicationId);
        }

        public async Task<string> HandleSecondaryApplicantAsync(dfa_appsecondaryapplicant_params objSecondaryApplicant)
        {
            var dfa_appsecondaryappid = await listsGateway.UpsertDeleteSecondaryApplicantAsync(objSecondaryApplicant);
            return dfa_appsecondaryappid;
        }

        public async Task<IEnumerable<dfa_appsecondaryapplicant_retrieve>> GetSecondaryApplicantsAsync(Guid applicationId)
        {
            return await listsGateway.GetSecondaryApplicantsListAsync(applicationId);
        }

        public async Task<string> HandleOtherContactAsync(dfa_appothercontact_params objOtherContact)
        {
            var dfa_appothercontactid = await listsGateway.UpsertDeleteOtherContactAsync(objOtherContact);
            return dfa_appothercontactid;
        }

        public async Task<IEnumerable<dfa_appothercontact_retrieve>> GetOtherContactsAsync(Guid applicationId)
        {
            return await listsGateway.GetOtherContactsListAsync(applicationId);
        }

        public async Task<string> HandleFullTimeOccupantAsync(dfa_appoccupant_params objAppOccupant)
        {
            var dfa_appoccupantid = await listsGateway.UpsertDeleteFullTimeOccupantAsync(objAppOccupant);
            return dfa_appoccupantid;
        }

        public async Task<IEnumerable<dfa_appoccupant_retrieve>> GetFullTimeOccupantsAsync(Guid applicationId)
        {
            return await listsGateway.GetFullTimeOccupantsListAsync(applicationId);
        }

        public async Task<string> HandleCleanUpLogItemAsync(dfa_appcleanuplogs_params objCleanUpLogItem)
        {
            var dfa_appcleanuplogid = await listsGateway.UpsertDeleteCleanUpLogItemAsync(objCleanUpLogItem);
            return dfa_appcleanuplogid;
        }

        public async Task<IEnumerable<dfa_appcleanuplogs_retrieve>> GetCleanUpLogItemsAsync(Guid applicationId)
        {
            return await listsGateway.GetCleanUpLogItemsListAsync(applicationId);
        }

        public async Task<string> HandleFileUploadAsync(dfa_appdocumentlocation_params objFileUpload)
        {
            var dfa_appdocumentlocationid = await listsGateway.UpsertDeleteDocumentLocationAsync(objFileUpload);
            return dfa_appdocumentlocationid;
        }

        public async Task<IEnumerable<dfa_appdocumentlocation_retrieve>> GetFileUploadsAsync(Guid applicationId)
        {
            return await listsGateway.GetDocumentLocationsListAsync(applicationId);
        }
    }
}
