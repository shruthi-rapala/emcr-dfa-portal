using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EMBC.DFA.API.ConfigurationModule.Models.Dynamics;
using EMBC.Utilities.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace EMBC.DFA.API.Controllers
{
    [Route("api/cleanuplogitem")]
    [ApiController]
    [Authorize]
    public class CleanUpLogItemController : ControllerBase
    {
        private readonly IHostEnvironment env;
        private readonly IMessagingClient messagingClient;
        private readonly IMapper mapper;
        private readonly IConfigurationHandler handler;

        public CleanUpLogItemController(
            IHostEnvironment env,
            IMessagingClient messagingClient,
            IMapper mapper,
            IConfigurationHandler handler)
        {
            this.env = env;
            this.messagingClient = messagingClient;
            this.mapper = mapper;
            this.handler = handler;
        }

        /// <summary>
        /// Create / update / delete a clean up log item
        /// </summary>
        /// <param name="cleanupLogItem">The clean up log item information</param>
        /// <returns>clean up log id</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpsertDeleteCleanUpLogItem(CleanUpLogItem cleanupLogItem)
        {
            if (cleanupLogItem == null) return BadRequest("CleanUpLogItem details cannot be empty.");
            var mappedCleanUpLogItem = mapper.Map<dfa_appcleanuplogs>(cleanupLogItem);

            var cleanupLogItemId = await handler.HandleCleanUpLogItemAsync(mappedCleanUpLogItem);
            return Ok(cleanupLogItemId);
        }

        /// <summary>
        /// Get a list of clean up log items by application Id
        /// </summary>
        /// <returns> CleanUpLogItems </returns>
        /// <param name="applicationId">The application Id.</param>
        [HttpGet("byApplicationId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<CleanUpLogItem>>> GetCleanUpLogItems(
            [FromQuery]
            [Required]
            string applicationId)
        {
            IEnumerable<dfa_appcleanuplogs> dfa_cleanupLogItems = await handler.GetCleanUpLogItemsAsync(applicationId);
            IEnumerable<CleanUpLogItem> cleanupLogItems = new CleanUpLogItem[] { };
            foreach (dfa_appcleanuplogs dfa_cleanupLogItem in dfa_cleanupLogItems)
            {
                CleanUpLogItem cleanupLogItem = mapper.Map<CleanUpLogItem>(dfa_cleanupLogItem);
                cleanupLogItems.Append<CleanUpLogItem>(cleanupLogItem);
            }
            return Ok(cleanupLogItems);
        }
    }

    /// <summary>
    /// Clean Up Log Item
    /// </summary>
    public class CleanUpLogItem
    {
        public string applicationId { get; set; }
        public string? id { get; set; }
        public string date { get; set; }
        public string name { get; set; }
        public string hours { get; set; }
        public string description { get; set; }
        public bool deleteFlag { get; set; }
    }
}
