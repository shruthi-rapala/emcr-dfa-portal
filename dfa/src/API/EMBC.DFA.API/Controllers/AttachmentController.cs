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

        /// <summary>
        /// Create / update / delete a file attachment
        /// </summary>
        /// <param name="fileUpload">The attachment information</param>
        /// <returns>file upload id</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpsertDeleteAttachment(FileUpload fileUpload)
        {
            if (fileUpload == null) return BadRequest("FileUpload details cannot be empty.");
            var mappedFileUpload = mapper.Map<AttachmentEntity>(fileUpload);
            var submissionEntity = new SubmissionEntity();
            // submissionEntity.dfa_appapplicationid = fileUpload.applicationId; TODO: add back
            submissionEntity.documentCollection = Enumerable.Empty<AttachmentEntity>();
            submissionEntity.documentCollection = submissionEntity.documentCollection.Append<AttachmentEntity>(mappedFileUpload);

            var result = await handler.HandleFileUploadAsync(submissionEntity);
            return Ok(result);
        }

        /// <summary>
        /// Get a list of attachments by application Id
        /// </summary>
        /// <returns> FileUploads </returns>
        /// <param name="applicationId">The application Id.</param>
        [HttpGet("byApplicationId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<FileUpload>>> GetAttachments(
            [FromQuery]
            [Required]
            Guid applicationId)
        {
            IEnumerable<sharepointdocumentlocation> dfa_appdocumentlocations = await handler.GetFileUploadsAsync(applicationId);
            IEnumerable<FileUpload> fileUploads = new FileUpload[] { };
            if (dfa_appdocumentlocations != null)
            {
                foreach (sharepointdocumentlocation dfa_appdocumentlocation in dfa_appdocumentlocations)
                {
                    FileUpload fileUpload = mapper.Map<FileUpload>(dfa_appdocumentlocation);
                    fileUpload.applicationId = applicationId; // TODO: remove this line should come from mapper
                    fileUpload.fileType = FileCategory.Unknown;
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
        public Guid applicationId { get; set; }
        public Guid? id { get; set; }
        public string fileName { get; set; }
        public string fileDescription { get; set; }
        public FileCategory fileType { get; set; }
        public string uploadedDate { get; set; }
        public string modifiedBy { get; set; }
        public byte[] fileData { get; set; }
        public string contentType { get; set; }
        public int fileSize { get; set; }
        public bool deleteFlag { get; set; }
    }
}
