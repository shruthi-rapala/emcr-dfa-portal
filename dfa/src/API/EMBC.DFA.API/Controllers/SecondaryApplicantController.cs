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
    [Route("api/secondaryapplicant")]
    [ApiController]
    [Authorize]
    public class SecondaryApplicantController : ControllerBase
    {
        private readonly IHostEnvironment env;
        private readonly IMessagingClient messagingClient;
        private readonly IMapper mapper;
        private readonly IConfigurationHandler handler;

        public SecondaryApplicantController(
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
        /// Create / update / delete a secondary applicant
        /// </summary>
        /// <param name="secondaryApplicant">The secondary applicant information</param>
        /// <returns>secondary applicant id</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpsertDeleteSecondaryApplicant(SecondaryApplicant secondaryApplicant)
        {
            if (secondaryApplicant == null) return BadRequest("SecondaryApplicant details cannot be empty.");
            var mappedSecondaryApplicant = mapper.Map<dfa_appsecondaryapplicant>(secondaryApplicant);

            var secondaryApplicationId = await handler.HandleSecondaryApplicantAsync(mappedSecondaryApplicant);
            return Ok(secondaryApplicationId);
        }

        /// <summary>
        /// Get a list of secondary applicants by id
        /// </summary>
        /// <returns> SecondaryApplicants </returns>
        /// <param name="applicationId">The application Id.</param>
        [HttpGet("byApplicationId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<SecondaryApplicant>>> GetSecondaryApplicants(
            [FromQuery]
            [Required]
            string applicationId)
        {
            IEnumerable<dfa_appsecondaryapplicant> dfa_appsecondaryapplicants = await handler.GetSecondaryApplicantsAsync(applicationId);
            IEnumerable<SecondaryApplicant> secondaryApplicants = new SecondaryApplicant[] { };
            foreach (dfa_appsecondaryapplicant dfa_appsecondaryapplicant in dfa_appsecondaryapplicants)
            {
                SecondaryApplicant secondaryApplicant = mapper.Map<SecondaryApplicant>(dfa_appsecondaryapplicant);
                secondaryApplicants.Append<SecondaryApplicant>(secondaryApplicant);
            }
            return Ok(secondaryApplicants);
        }
    }

    /// <summary>
    /// Seoondary Applicant
    /// </summary>
    public class SecondaryApplicant
    {
        public string? id { get; set; }
        public string applicationId { get; set; }
        public SecondaryApplicantTypeOption applicantType { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public bool deleteFlag { get; set; }
    }
}
