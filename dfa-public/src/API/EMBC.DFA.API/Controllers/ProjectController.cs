﻿using System;
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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace EMBC.DFA.API.Controllers
{
    [Route("api/projects")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IHostEnvironment env;
        private readonly IMapper mapper;
        private readonly IConfigurationHandler handler;
        // 2024-08-11 EMCRI-595 waynezen; BCeID Authentication
        private readonly IUserService userService;

        public ProjectController(
            IHostEnvironment env,
            IMapper mapper,
            IConfigurationHandler handler,
            IUserService userService)
        {
            this.env = env;
            this.mapper = mapper;
            this.handler = handler;
            this.userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        private string currentUserId => userService.GetBCeIDBusinessId();

        /// <summary>
        /// get dfa applications
        /// </summary>
        /// <param name="applicationId">The application Id.</param>
        /// <returns>list of dfa applications</returns>
        [HttpGet("dfaprojects")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<CurrentProject>>> GetDFAProjects(string applicationId)
        {
            //var userId = currentUserId;
            //var profile = await handler.HandleGetUser(userId);
            //if (profile == null) return NotFound(userId);
            //var profileId = profile.Id;
            var lstProjects = await handler.HandleProjectList(applicationId);

            return Ok(lstProjects);
        }

        /// <summary>
        /// create or update project
        /// </summary>
        /// <param name="project">The project information</param>
        /// <returns>application id</returns>
        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpsertProject(DFAProjectMain project)
        {
            if (project == null) return BadRequest("Project details cannot be empty.");
            var dfa_appcontact = await handler.HandleGetUser(currentUserId);
            var mappedProject = mapper.Map<dfa_project_params>(project);
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
        public async Task<ActionResult<DFAProjectMain>> GetProjectMain(
            [FromQuery]
            [Required]
            Guid projectId)
        {
            var userId = currentUserId;
            var appContactProfile = await handler.HandleGetUser(userId);

            var dfa_project = await handler.GetProjectMainAsync(projectId);
            DFAProjectMain dfaProjectMain = new DFAProjectMain();
            dfaProjectMain.Id = projectId;
            dfaProjectMain.Project = mapper.Map<RecoveryPlan>(dfa_project);

            return Ok(dfaProjectMain);
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

        /// <summary>
        /// get dfa project amendments
        /// </summary>
        /// <param name="projectId">The project Id.</param>
        /// <returns>list of project amendments</returns>
        [HttpGet("dfaprojectamendments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<CurrentProjectAmendment>>> GetDFAProjectAmendments(string projectId)
        {
            var lstProjectAmendments = await handler.HandleProjectAmendmentList(projectId);

            return Ok(lstProjectAmendments);
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

    public class CurrentProjectAmendment
    {
        public string ProjectId { get; set; }
        public string AmendmentNumber { get; set; }
        public string AmendmentReceivedDate { get; set; }
        public string AmendmentReason { get; set; }
        public string AmendmentApprovedDate { get; set; }
        public string EMCRDecisionComments { get; set; }
        public string RequestforProjectDeadlineExtention { get; set; }
        public string AmendedProjectDeadlineDate { get; set; }
        public string DeadlineExtensionApproved { get; set; }
        public string Amended18MonthDeadline { get; set; }
        public string RequestforAdditionalProjectCost { get; set; }
        public string EstimatedAdditionalProjectCost { get; set; }
        public string AdditionalProjectCostDecision { get; set; }
        public string ApprovedAdditionalProjectCost { get; set; }
        public string AmendmentId { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public List<ProjectStatusBar> StatusBar { get; set; }
        public string StatusLastUpdated { get; set; }
        public bool IsErrorInStatus { get; set; }
        public bool IsHidden { get; set; } = true;
        public string StatusColor { get; set; }
    }

    public class CurrentProject
    {
        public string ApplicationId { get; set; }
        public string ProjectId { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectName { get; set; }
        public string SiteLocation { get; set; }
        public string CreatedDate { get; set; }
        public string EstimatedCompletionDate { get; set; }
        public string EMCRApprovedAmount { get; set; }
        public string Deadline18Month { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public List<ProjectStatusBar> StatusBar { get; set; }
        public string StatusLastUpdated { get; set; }
        public bool IsErrorInStatus { get; set; }
        public bool IsHidden { get; set; } = true;
        public string StatusColor { get; set; }
        public string DateFileClosed { get; set; }
        public bool IsClaimSubmission { get; set; }
        public bool HasAmendment { get; set; }
    }

    public class ProjectStatusBar
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
