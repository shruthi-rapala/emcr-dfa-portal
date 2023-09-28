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
        private readonly IMapper mapper;

        public EligibilityController(
            IHostEnvironment env,
            IMessagingClient messagingClient,
            IMapper mapper,
            IConfigurationHandler handler)
        {
            this.handler = handler;
            this.mapper = mapper;
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

        /// <summary>
        /// Retrieve list of open events for prescreening
        /// </summary>
        /// <returns>list of prescreening events</returns>
        [HttpGet("prescreeningEvents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<DisasterEvent>>> GetPrescreeningEvents()
        {
            var dfa_events = await handler.HandlePrescreeningEventList();

            IEnumerable<DisasterEvent> disasterEvents = new DisasterEvent[] { };
            if (dfa_events != null)
            {
                foreach (dfa_event dfa_event in dfa_events)
                {
                    DisasterEvent disasterEvent = mapper.Map<DisasterEvent>(dfa_event);
                    disasterEvents = disasterEvents.Append<DisasterEvent>(disasterEvent);
                }
                return Ok(disasterEvents);
            }
            else
            {
                return Ok(null);
            }
        }
    }

    public class DisasterEvent
    {
        public string eventId { get; set; }
        public string id { get; set; }
        public string ninetyDayDeadline { get; set; }
    }
}
