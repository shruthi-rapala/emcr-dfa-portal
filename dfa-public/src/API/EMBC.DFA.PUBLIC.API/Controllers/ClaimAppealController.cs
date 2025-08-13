using System;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using EMBC.Database.Contract;
using EMBC.Database.Model;
using EMBC.Database.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.PowerPlatform.Dataverse.Client;

namespace EMBC.DFA.PUBLIC.API.Controllers
{
   

    /// <summary>
    /// Controller for managing public project appeals.
    /// </summary>
    [ApiController]
    [Route("api/claimappeals")]
    [Authorize]
    public class ClaimAppealController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IClaimAppealRepository claimAppealRepository;

        public ClaimAppealController(IMapper mapper, IClaimAppealRepository claimAppealRepository)
        {
            this.mapper = mapper;
            this.claimAppealRepository = claimAppealRepository;
        }



        /// <summary>
        /// Create an appeal
        /// </summary>
        /// <param name="appeal">The appeal information</param>
        /// <returns>appeal id</returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateClaimAppeal([FromBody] ClaimAppealModel appeal)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (appeal == null) return BadRequest("Appeal details cannot be empty.");

            var mappedClaimAppeal = mapper.Map<ClaimAppeal>(appeal);

            var claimAppealId = claimAppealRepository.Insert(mappedClaimAppeal);
            return Ok(claimAppealId);

        }
    }

    public class ClaimAppealModel {
     public Guid? ClaimId { get; set; }

    }
}
