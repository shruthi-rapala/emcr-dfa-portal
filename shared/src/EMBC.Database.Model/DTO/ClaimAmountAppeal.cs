using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMBC.Database.Contract.DTO
{
    public record ClaimAmountAppeal: IDto
    {
        public Guid Id { get; set; }
        public StateCode StateCode { get; set; }

        public Guid? CaseAppealId { get; set; }       // Dynamics Optional
        public Stage[]? Stages { get; set; }            // Dynamics Optional
        public DateTime? CompletedOn { get; set; }     // Dynamics Optional

        // Related Entities
        public Stage? ActiveStage { get; set; }         // Dynamics Optional
    }
}
