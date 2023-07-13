using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cronos;
using EMBC.DFA.API.Mappers;
using EMBC.Utilities.Caching;
using Microsoft.Extensions.Logging;
using Xrm.Tools.WebAPI;
using Xrm.Tools.WebAPI.Requests;
using static Pipelines.Sockets.Unofficial.SocketConnection;

namespace EMBC.DFA.API.ConfigurationModule.Models.Dynamics
{
    public interface IConfigurationHandler
    {
        Task<IEnumerable<Contact>> Handle();
        Task<IEnumerable<Country>> HandleCountry();
        Task<string> HandleContact(dfa_appcontact objContact);
        Task<string> HandleApplication(dfa_appapplicationstart objApplication);
        Task<dfa_appapplicationstart> GetApplicationStartAsync(string applicationId);
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
            var contacts = await listsGateway.GetContactsAsync();
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

        public async Task<IEnumerable<Country>> HandleCountry()
        {
            //await cache.Refresh("countries", listsGateway.GetCountriesAsync, TimeSpan.FromDays(1));
            return await listsGateway.GetCountriesAsync();
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

        public async Task<dfa_appapplicationstart> GetApplicationStartAsync(string applicationId)
        {
            var dfa_appapplication = await listsGateway.GetApplicationStartById(applicationId);
            return dfa_appapplication;
        }
    }
}
