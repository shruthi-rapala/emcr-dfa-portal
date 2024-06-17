using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EMBC.DFA.API.ConfigurationModule.Models.Dynamics;
using EMBC.Utilities.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace EMBC.DFA.API.Controllers
{
    [Route("api/attachments")]
    [ApiController]
    [Authorize]
    public class AttachmentController : ControllerBase
    {
        private readonly IHostEnvironment env;
        private readonly IMessagingClient messagingClient;
        private readonly IMapper mapper;
        private readonly IConfigurationHandler handler;

        public AttachmentController(
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
        /// Create / update / delete a file attachment
        /// </summary>
        /// <param name="fileUpload">The attachment information</param>
        /// <returns>file upload id</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [RequestSizeLimit(36700160)]
        public async Task<ActionResult<string>> UpsertDeleteAttachment(FileUpload fileUpload)
        {
            if (fileUpload.fileData == null && fileUpload.deleteFlag == false) return BadRequest("FileUpload data cannot be empty.");
            if (fileUpload.id == null && fileUpload.deleteFlag == true) return BadRequest("FileUpload id cannot be empty on delete");

            if (fileUpload.project != null &&
                (fileUpload.project.Id == Guid.Empty || fileUpload.project.Id.ToString() == string.Empty))
            {
                var dfa_appcontact = await handler.HandleGetUser(currentUserId);
                //var mappedProject = mapper.Map<dfa_project_params>(fileUpload.project);
                //var result = await handler.HandleProjectCreateUpdate(mappedProject);
            }

            //if (fileUpload.deleteFlag == true)
            //{
            //    var parms = new dfa_DFAActionDeleteDocuments_parms();
            //    if (fileUpload.id != null) parms.AppDocID = (Guid)fileUpload.id;
            //    var result = await handler.DeleteFileUploadAsync(parms);
            //    return Ok(result);
            //}
            //else
            //{
            //    var mappedFileUpload = mapper.Map<AttachmentEntity>(fileUpload);
            //    var submissionEntity = mapper.Map<SubmissionEntity>(fileUpload);
            //    submissionEntity.documentCollection = Enumerable.Empty<AttachmentEntity>();
            //    submissionEntity.documentCollection = submissionEntity.documentCollection.Append<AttachmentEntity>(mappedFileUpload);
            //    var result = await handler.HandleFileUploadAsync(submissionEntity);
            //    return Ok(result);
            //}

            return Ok(null);
        }

        /// <summary>
        /// Get a list of attachments by project Id
        /// </summary>
        /// <returns> FileUploads </returns>
        /// <param name="projectId">The project Id.</param>
        [HttpGet("byProjectIdId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<FileUpload>>> GetAttachments(
            [FromQuery]
            [Required]
            Guid projectId)
        {
            IEnumerable<dfa_appdocumentlocation> dfa_appdocumentlocations = await handler.GetFileUploadsAsync(projectId);
            IEnumerable<FileUpload> fileUploads = new FileUpload[] { };
            if (dfa_appdocumentlocations != null)
            {
                foreach (dfa_appdocumentlocation dfa_appdocumentlocation in dfa_appdocumentlocations)
                {
                    FileUpload fileUpload = mapper.Map<FileUpload>(dfa_appdocumentlocation);
                    fileUploads = fileUploads.Append<FileUpload>(fileUpload);
                }
                return Ok(fileUploads);
            }
            else
            {
                return Ok(null);
            }
        }
    }

    /// <summary>
    /// File Upload
    /// </summary>
    public class FileUpload
    {
        public Guid projectId { get; set; }
        public Guid? id { get; set; }
        public string? fileName { get; set; }
        public string? fileDescription { get; set; }
        public FileCategory? fileType { get; set; }
        public RequiredDocumentType? requiredDocumentType { get; set; }
        public string? uploadedDate { get; set; }
        public string? modifiedBy { get; set; }
        public byte[]? fileData { get; set; }
        public string? contentType { get; set; }
        public int? fileSize { get; set; }
        public bool deleteFlag { get; set; }
        public DFAProjectMain project { get; set; }
    }
}
