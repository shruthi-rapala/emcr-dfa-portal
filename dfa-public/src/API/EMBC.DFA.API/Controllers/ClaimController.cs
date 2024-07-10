using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
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
    [Route("api/claims")]
    [ApiController]
    [Authorize]
    public class ClaimController : ControllerBase
    {
        private readonly IHostEnvironment env;
        private readonly IMessagingClient messagingClient;
        private readonly IMapper mapper;
        private readonly IConfigurationHandler handler;

        public ClaimController(
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

        private string currentUserId => User.FindFirstValue(JwtRegisteredClaimNames.Sub);

        /// <summary>
        /// get dfa claims
        /// </summary>
        /// <param name="projectId">The project Id.</param>
        /// <returns>list of dfa claims</returns>
        [HttpGet("dfaclaims")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<CurrentClaim>>> GetDFAClaims(string projectId)
        {
            var userId = currentUserId;
            var profile = await handler.HandleGetUser(userId);
            if (profile == null) return NotFound(userId);
            var profileId = profile.Id;
            var lstProjects = await handler.HandleProjectList(projectId);

            //var lstProjects = new List<CurrentProject>()
            //{
            //    new CurrentProject()
            //    {
            //        ProjectId = "a75d9eed-2e24-ef11-b850-00505683fbf4",
            //        ProjectName = "Damaged pond",
            //        ProjectNumber = "1.0",
            //        SiteLocation = "1700 Block Fir Street",
            //        EstimatedCompletionDate = "2025-03-06T07:00:00.0000000Z",
            //        Deadline18Month = "2025-07-12T07:00:00.0000000Z",
            //        EMCRApprovedAmount = "(pending claim information)",
            //        Status = "Submitted",
            //        Stage = "Pending",
            //        CreatedDate = "2024-03-06T07:00:00.0000000Z"
            //    },
            //    new CurrentProject()
            //    {
            //        ProjectId = "2",
            //        ProjectName = "Overland flooding - Road",
            //        ProjectNumber = "2.0",
            //        SiteLocation = "145 Block Fir Street",
            //        EstimatedCompletionDate = "2025-01-06T07:00:00.0000000Z",
            //        Deadline18Month = "2025-11-22T07:00:00.0000000Z",
            //        EMCRApprovedAmount = "(pending claim information)",
            //        Status = "Decision Made",
            //        Stage = "Approved",
            //        CreatedDate = "2024-01-06T07:00:00.0000000Z"
            //    },
            //    new CurrentProject()
            //    {
            //        ProjectId = "3",
            //        ProjectName = "Overland flooding - Road",
            //        ProjectNumber = "3.0",
            //        SiteLocation = "2200 Block Fir Street",
            //        EstimatedCompletionDate = "2024-12-06T07:00:00.0000000Z",
            //        Deadline18Month = "2025-11-06T07:00:00.0000000Z",
            //        EMCRApprovedAmount = "(pending claim information)",
            //        Status = "Decision Made",
            //        Stage = "Ineligible",
            //        CreatedDate = "2023-11-06T07:00:00.0000000Z"
            //    },
            //    new CurrentProject()
            //    {
            //        ProjectId = "4",
            //        ProjectName = "Storm damage",
            //        ProjectNumber = "4.0",
            //        SiteLocation = "334 Block Fir Street",
            //        EstimatedCompletionDate = "2024-08-06T07:00:00.0000000Z",
            //        Deadline18Month = "2025-08-06T07:00:00.0000000Z",
            //        EMCRApprovedAmount = "(pending claim information)",
            //        Status = "Approval Pending",
            //        Stage = "In Progress",
            //        CreatedDate = "2024-02-06T07:00:00.0000000Z"
            //    },
            //    new CurrentProject()
            //    {
            //        ProjectId = "5",
            //        ProjectName = "Storm damage",
            //        ProjectNumber = "5.0",
            //        SiteLocation = "654 Block Fir Street",
            //        EstimatedCompletionDate = "2024-11-06T07:00:00.0000000Z",
            //        Deadline18Month = "2025-06-06T07:00:00.0000000Z",
            //        EMCRApprovedAmount = "(pending claim information)",
            //        Status = "Draft",
            //        Stage = string.Empty,
            //        CreatedDate = "2024-05-23T07:00:00.0000000Z"
            //    },
            //    new CurrentProject()
            //    {
            //        ProjectId = "6",
            //        ProjectName = "Overland flooding - Road",
            //        ProjectNumber = "6.0",
            //        SiteLocation = "403 Block Fir Street",
            //        EstimatedCompletionDate = "2024-05-06T07:00:00.0000000Z",
            //        Deadline18Month = "2025-10-06T07:00:00.0000000Z",
            //        EMCRApprovedAmount = "(pending claim information)",
            //        Status = "Decision Made",
            //        Stage = "Ineligible",
            //        CreatedDate = "2024-04-06T07:00:00.0000000Z"
            //    },
            //};

            return Ok(lstProjects);
        }

        /// <summary>
        /// create or update claim
        /// </summary>
        /// <param name="claim">The claim information</param>
        /// <returns>claim id</returns>
        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpsertClaim(DFAClaimMain claim)
        {
            if (claim == null) return BadRequest("Project details cannot be empty.");
            var dfa_appcontact = await handler.HandleGetUser(currentUserId);
            var mappedProject = mapper.Map<dfa_project_params>(claim);
            var result = await handler.HandleProjectCreateUpdate(mappedProject);

            return Ok(result);
        }

        /// <summary>
        /// Get project main by Id
        /// </summary>
        /// <returns> DFAProjectMain</returns>
        /// <param name="projectId">The project Id.</param>
        [HttpGet("appmain/byId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DFAClaimMain>> GetProjectMain(
            [FromQuery]
            [Required]
            Guid projectId)
        {
            var userId = currentUserId;
            var appContactProfile = await handler.HandleGetUser(userId);

            var dfa_project = await handler.GetProjectMainAsync(projectId);
            DFAClaimMain dfaClaimMain = new DFAClaimMain();
            dfaClaimMain.Id = projectId;
            dfaClaimMain.Project = mapper.Map<RecoveryPlan>(dfa_project);

            return Ok(dfaClaimMain);
        }

        /// <summary>
        /// get dfa project details
        /// </summary>
        /// <returns>project details</returns>
        /// <param name="projectId">The project Id.</param>
        [HttpGet("dfaprojectbyID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CurrentProject>> GetProjectDetailsForClaim([FromQuery]
            [Required]
            Guid projectId)
        {
            var objProject = await handler.HandleProjectDetails(Convert.ToString(projectId));
            return Ok(objProject);
        }

        public static string GetEnumDescription(System.Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes = fi.GetCustomAttributes(typeof(DescriptionAttribute), false) as DescriptionAttribute[];

            if (attributes != null && attributes.Any())
            {
                return attributes.First().Description;
            }

            return value.ToString();
        }
    }

    public class CurrentClaim
    {
        public string ApplicationId { get; set; }
        public string ProjectId { get; set; }
        public string ClaimId { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectName { get; set; }
        public string SiteLocation { get; set; }
        public string CreatedDate { get; set; }
        public string EstimatedCompletionDate { get; set; }
        public string EMCRApprovedAmount { get; set; }
        public string Deadline18Month { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public List<ClaimStatusBar> StatusBar { get; set; }
        public string StatusLastUpdated { get; set; }
        public bool IsErrorInStatus { get; set; }
        public bool IsHidden { get; set; } = true;
        public string StatusColor { get; set; }
    }

    public class ClaimStatusBar
    {
        public string Status { get; set; }
        public string Stage { get; set; }
        public bool IsCompleted { get; set; }
        public bool CurrentStep { get; set; }
        public bool IsFinalStep { get; set; }
        public bool IsErrorInStatus { get; set; }
        public string StatusColor { get; set; }
    }
}
