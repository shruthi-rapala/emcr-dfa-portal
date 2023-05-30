using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cronos;
using EMBC.Utilities.Caching;
using Microsoft.Extensions.Logging;
using Xrm.Tools.WebAPI;
using Xrm.Tools.WebAPI.Requests;

namespace EMBC.DFA.API.ConfigurationModule.Models.Dynamics
{
    public interface IConfigurationHandler
    {
        Task<IEnumerable<Country>> Handle();
    }
    public class Handler : IConfigurationHandler
    {
        //private readonly CRMWebAPI api;
        //private readonly IListsRepository listsRepository;
        private readonly ICache cache;
        private readonly IListsGateway listsGateway;

        public Handler(ICache cache,
            IListsGateway listsGateway)
        {
            this.cache = cache;
            this.listsGateway = listsGateway;
        }

        public async Task<IEnumerable<Country>> Handle()
        {
            //await cache.Refresh("countries", listsGateway.GetCountriesAsync, TimeSpan.FromDays(1));
            return await listsGateway.GetCountriesAsync();
        }
    }
}
