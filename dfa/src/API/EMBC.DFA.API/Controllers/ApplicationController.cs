using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EMBC.DFA.API.ConfigurationModule.Models.Dynamics;
using EMBC.DFA.API.Services;
using EMBC.Utilities.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace EMBC.DFA.API.Controllers
{
    [Route("api/applications")]
    [ApiController]
    [Authorize]
    public class ApplicationController : ControllerBase
    {
        private readonly IHostEnvironment env;
        private readonly IMessagingClient messagingClient;
        private readonly IMapper mapper;
        private readonly IConfigurationHandler handler;

        public ApplicationController(
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
        /// Create an application
        /// </summary>
        /// <param name="application">The application information</param>
        /// <returns>application id</returns>
        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> AddApplication(DFAApplicationStart application)
        {
            if (application == null) return BadRequest("Application details cannot be empty.");
            var mappedApplication = mapper.Map<dfa_appapplicationstart>(application);

            var applicationId = await handler.HandleApplication(mappedApplication);
            return Ok(applicationId);
        }

        /// <summary>
        /// Update an application
        /// </summary>
        /// <param name="application">The application information</param>
        /// <returns>application id</returns>
        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpdateApplication(DFAApplicationMain application)
        {
            if (application == null) return BadRequest("Application details cannot be empty.");
            var mappedApplication = mapper.Map<dfa_appapplicationmain>(application);

            var applicationId = await handler.HandleApplicationUpdate(mappedApplication);
            return Ok(applicationId);
        }

        /// <summary>
        /// Get an application by Id
        /// </summary>
        /// <returns> DFAApplicationStart</returns>
        /// <param name="applicationId">The application Id.</param>
        [HttpGet("appstart/byId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DFAApplicationStart>> GetApplicationStart(
            [FromQuery]
            [Required]
            string applicationId)
        {
            var dfa_appapplication = await handler.GetApplicationStartAsync(applicationId);
            DFAApplicationStart dfaApplicationStart = new DFAApplicationStart();
            dfaApplicationStart.Id = applicationId;
            dfaApplicationStart.ProfileVerification = mapper.Map<ProfileVerification>(dfa_appapplication);
            dfaApplicationStart.Consent = mapper.Map<Consent>(dfa_appapplication);
            dfaApplicationStart.AppTypeInsurance = mapper.Map<AppTypeInsurance>(dfa_appapplication);
            return Ok(dfaApplicationStart);
        }

        /// <summary>
        /// Get an application main by Id
        /// </summary>
        /// <returns> DFAApplicationMain</returns>
        /// <param name="applicationId">The application Id.</param>
        [HttpGet("appmain/byId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DFAApplicationStart>> GetApplicationMain(
            [FromQuery]
            [Required]
            string applicationId)
        {
            var dfa_appapplication = await handler.GetApplicationMainAsync(applicationId);
            DFAApplicationMain dfaApplicationMain = new DFAApplicationMain();
            dfaApplicationMain.Id = applicationId;
            dfaApplicationMain.DamagedPropertyAddress = mapper.Map<DamagedPropertyAddress>(dfa_appapplication);
            dfaApplicationMain.PropertyDamage = mapper.Map<PropertyDamage>(dfa_appapplication);
            // TODO controllers for occupants, secondary applicants, other contacts, clean up log, damaged items by room, document locations,
            dfaApplicationMain.SignAndSubmit = mapper.Map<SignAndSubmit>(dfa_appapplication);
            dfaApplicationMain.CleanUpLog = mapper.Map<CleanUpLog>(dfa_appapplication);
            dfaApplicationMain.SupportingDocuments = mapper.Map<SupportingDocuments>(dfa_appapplication);
            return Ok(dfaApplicationMain);
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    public class DFAApplicationStart
    {
        public string? Id { get; set; }

        public Consent Consent { get; set; }

        public ProfileVerification ProfileVerification { get; set; }

        public AppTypeInsurance AppTypeInsurance { get; set; }
    }

    public class DFAApplicationMain
    {
        public string Id { get; set; }

        public DamagedPropertyAddress DamagedPropertyAddress { get; set; }

        public PropertyDamage PropertyDamage { get; set; }

        public CleanUpLog CleanUpLog { get; set; }

        public SupportingDocuments SupportingDocuments { get; set; }

        public SignAndSubmit SignAndSubmit { get; set; }
    }
}
