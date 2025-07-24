using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EMBC.Database.Contract;
using EMBC.Database.Model;
using EMBC.Database.Resources;
using EMBC.Database.Shared.Database;
using EMBC.DFA.API.ConfigurationModule.Models.Dynamics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.PowerPlatform.Dataverse.Client;
using Microsoft.Xrm.Sdk.Client;

namespace EMBC.DFA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppealController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAppealRepository repository;
        private readonly IOrganizationServiceAsync organizationService;

        public AppealController(
            IMapper mapper,
            IAppealRepository repository,
            IOrganizationServiceAsync organizationService)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.organizationService = organizationService;
        }

        private string currentUserId => User.FindFirstValue(JwtRegisteredClaimNames.Sub);

        private async Task UploadSignatureAnnotationAsync(
            string entityName,
            Guid entityId,
            SignatureBlockModel signature,
            string fileName,
            string displayName,
            string note)
        {
            if (signature?.Signature != null)
            {
                var base64Data = signature.Signature;
                if (base64Data.Contains(","))
                    base64Data = base64Data.Substring(base64Data.IndexOf(',') + 1);

                await organizationService.UploadFileAsAnnotationAsync(
                    entityName,
                    entityId,
                    fileName,
                    "image/png",
                    base64Data,
                    displayName,
                    note);
            }
        }

        /// <summary>
        /// Create an appeal
        /// </summary>
        /// <param name="appeal">The appeal information</param>
        /// <returns>appeal id</returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateAppeal([FromBody] AppealModel appeal)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (appeal == null) return BadRequest("Appeal details cannot be empty.");

            if (!Enum.IsDefined(typeof(DFA_AppealType), appeal.Type))
                return BadRequest("Type is required and must be a valid value.");

            var mappedAppeal = mapper.Map<Appeal>(appeal);

            var appealId = repository.Insert(mappedAppeal);

            await UploadSignatureAnnotationAsync(
                "dfa_appeal",
                appealId,
                appeal.SignAndSubmit?.ApplicantSignature,
                "applicant_signature.png",
                "Signature of Applicant",
                "This is the uploaded applicant signature.");

            await UploadSignatureAnnotationAsync(
                "dfa_appeal",
                appealId,
                appeal.SignAndSubmit?.SecondaryApplicantSignature,
                "secondary_applicant_signature.png",
                "Signature of Secondary Applicant",
                "This is the uploaded secondary applicant signature.");
            return Ok(appealId);
        }

        /// <summary>
        /// Retrieve an appeal
        /// </summary>
        /// <param name="id">The appeal id</param>
        /// <returns>The appeal information</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<AppealModel> GetAppeal(Guid id)
        {
            var appeal = repository.FirstOrDefault(e => e.Id == id);
            if (appeal == null) return NotFound();
            var model = mapper.Map<AppealModel>(appeal);
            return Ok(model);
        }


        ///// <summary>
        ///// Create or update an appeal and return the appeal ID
        ///// </summary>
        ///// <param name="appealMain">The DFA appeal main information</param>
        ///// <returns>Appeal ID</returns>
        //[HttpPut("create")]
        //[ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<IActionResult> CreateOrUpdateAppeal([FromBody] DFAAppealMain appealMain)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);
        //    if (appealMain == null || appealMain.Appeal == null)
        //        return BadRequest("Appeal details cannot be empty.");

        //    if (!Enum.IsDefined(typeof(DFA_AppealType), appealMain.Appeal.Type))
        //        return BadRequest("Type is required and must be a valid value.");

        //    // Map DFAAppealMain to Appeal (DTO)
        //    var mappedAppeal = mapper.Map<Appeal>(appealMain.Appeal);

        //    Guid appealId;
        //    if (appealMain.Id.HasValue && appealMain.Id.Value != Guid.Empty)
        //    {
        //        // Update scenario
        //        mappedAppeal.Id = appealMain.Id.Value;
        //        var updateResult = repository.Update(mappedAppeal);
        //        if (!updateResult)
        //            return BadRequest("Failed to update the appeal.");
        //        appealId = mappedAppeal.Id; // Use the existing ID for updated appeal
        //    }
        //    else
        //    {
        //        // Create scenario
        //        appealId = repository.Insert(mappedAppeal);
        //    }

        //    await UploadSignatureAnnotationAsync(
        //        "dfa_appeal",
        //        appealId,
        //        appealMain.Appeal.SignAndSubmit?.ApplicantSignature,
        //        "applicant_signature.png",
        //        "Signature of Applicant",
        //        "This is the uploaded applicant signature.");

        //    await UploadSignatureAnnotationAsync(
        //        "dfa_appeal",
        //        appealId,
        //        appealMain.Appeal.SignAndSubmit?.SecondaryApplicantSignature,
        //        "secondary_applicant_signature.png",
        //        "Signature of Secondary Applicant",
        //        "This is the uploaded secondary applicant signature.");

        //    return Ok(appealId);
        //}
    }
      

    //public class DFAAppealMain
    //{
    //    public Guid? Id { get; set; }
    //    public string? CaseId { get; set; }
    //    public AppealModel? Appeal { get; set; }
    //}

    public class AppealModel
    {
       // public Guid? ApplicationId { get; set; }
        [Required]
        public Guid? CaseId { get; set; }
       
        public string? Status { get; set; }
       
        public string? Reason { get; set; }
       
        public DFA_AppealType? Type { get; set; }
        public SignAndSubmitModel? SignAndSubmit { get; set; }
    }

    public class SignAndSubmitModel
    {
        public SignatureBlockModel ApplicantSignature { get; set; }
        public SignatureBlockModel SecondaryApplicantSignature { get; set; }
    }

    public class SignatureBlockModel
    {
        public string? Signature { get; set; }
        public string? DateSigned { get; set; }
        public string? SignedName { get; set; }
    }
}
