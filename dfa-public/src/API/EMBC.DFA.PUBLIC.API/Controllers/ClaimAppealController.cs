using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
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
        private readonly IInvoiceAppealRepository invoiceAppealRepository;

        public ClaimAppealController(IMapper mapper, IClaimAppealRepository claimAppealRepository, IInvoiceAppealRepository invoiceAppealRepository)
        {
            this.mapper = mapper;
            this.claimAppealRepository = claimAppealRepository;
            this.invoiceAppealRepository = invoiceAppealRepository;
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

            // Check if the appeal already exists
            //var claimIdString = appeal.ClaimId.ToString();
            var existingAppeal = claimAppealRepository.Where(a => a.ClaimId == appeal.ClaimId);
            if (existingAppeal != null && existingAppeal.Any())
            {
                // Return 500 Internal Server Error if appeal already exists
                return StatusCode(StatusCodes.Status500InternalServerError, "Appeal already exists.");
            }

            var mappedClaimAppeal = mapper.Map<ClaimAppeal>(appeal);

            var claimAppealId = claimAppealRepository.Insert(mappedClaimAppeal);
            return Ok(claimAppealId);

        }

        /// <summary>
        /// Create an invoice appeal
        /// </summary>
        /// <param name="appeals">The appeal information</param>
        /// <returns>appeal id</returns>
        [HttpPost("createInvoiceAppeal")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateInvoiceAppeal([FromBody] IEnumerable<InvoiceAppealModel> appeals)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (appeals == null) return BadRequest("Invoice Appeal details cannot be empty.");

            var mappedInvoiceAppeals = mapper.Map<IEnumerable<InvoiceAppeal>>(appeals);

            foreach (var invoiceAppeal in mappedInvoiceAppeals)
            {
                // Check if the invoice appeal already exists
                var existingInvoiceAppeal = invoiceAppealRepository.Where(a =>
                    a.ClaimAppealId == invoiceAppeal.ClaimAppealId &&
                    a.OriginInvoiceId == invoiceAppeal.OriginInvoiceId);

                if (existingInvoiceAppeal != null && existingInvoiceAppeal.Any())
                {
                    // Return 500 Internal Server Error if invoice appeal already exists
                    return StatusCode(StatusCodes.Status500InternalServerError, "Invoice appeal already exists.");
                }

                invoiceAppealRepository.Insert(invoiceAppeal);
            }
            return Ok();

        }
    }

    public class ClaimAppealModel {
     public string ClaimId { get; set; }

    }
    public class InvoiceAppealModel
    {
        public Guid ClaimAppealId { get; set; }
        public Guid OriginInvoiceId { get; set; }
        public string InvoiceDecisionComments { get; set; }

    }
}
