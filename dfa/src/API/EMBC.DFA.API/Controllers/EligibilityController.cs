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
using static StackExchange.Redis.Role;

namespace EMBC.DFA.API.Controllers
{
    [Route("api/eligibility")]
    [ApiController]
    public class EligibilityController : ControllerBase
    {
        private readonly IConfigurationHandler handler;

        public EligibilityController(
            IHostEnvironment env,
            IMessagingClient messagingClient,
            IMapper mapper,
            IConfigurationHandler handler)
        {
            this.handler = handler;
        }

        /// <summary>
        /// Checking events are present in the system
        /// </summary>
        /// <returns>true or false</returns>
        [HttpGet("checkEventsAvailable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> GetEvents()
        {
            var result = await handler.HandleEvents();
            return Ok(result);
        }
    }
}
