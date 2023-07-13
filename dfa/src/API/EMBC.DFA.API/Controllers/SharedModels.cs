using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Org.BouncyCastle.Asn1.Mozilla;

namespace EMBC.DFA.API.Controllers
{
    /// <summary>
    /// Address data with optional lookup code
    /// </summary>
    public class Address
    {
        public string? AddressLine1 { get; set; }

        public string? AddressLine2 { get; set; }

        public string? City { get; set; }

        public string? StateProvince { get; set; }

        public string? PostalCode { get; set; }
    }

    /// <summary>
    /// Profile personal details
    /// </summary>
    public class PersonDetails
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string? Initials { get; set; }
        public string IndigenousStatus { get; set; }
    }

    /// <summary>
    /// Profile contact information
    /// </summary>
    public class ContactDetails
    {
        //[EmailAddress]
        public string Email { get; set; }

        //[Phone]
        public string? ResidencePhone { get; set; }

        public string? CellPhoneNumber { get; set; }

        public string? AlternatePhone { get; set; }
    }

    /// <summary>
    /// Profile security questions
    /// </summary>
    public class SecurityQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public bool AnswerChanged { get; set; }
    }

    /// <summary>
    /// Application consent
    /// </summary>
    public class Consent
    {
        public bool consent { get; set; }
    }

    /// <summary>
    /// Profile Verification
    /// </summary>
    public class ProfileVerification
    {
        public bool profileVerified { get; set; }
        public string profileId { get; set; }
    }

    /// <summary>
    /// Application Type and Insurance
    /// </summary>
    public class AppTypeInsurance
    {
        public ApplicantOption applicantOption { get; set; }
        public InsuranceOption insuranceOption { get; set; }
        public SmallBusinessOption? smallBusinessOption { get; set; }
        public FarmOption? farmOption { get; set; }
        public SignatureBlock? applicantSignature { get; set; }
        public SignatureBlock? secondaryApplicantSignature { get; set; }
    }

    /// <summary>
    /// Signature Block
    /// </summary>
    public class SignatureBlock
    {
        public string dateSigned { get; set; }
        public string signedName { get; set; }
        public string signature { get; set; }
    }

    /// <summary>
    /// Insurance Options
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum InsuranceOption
    {
        [EnumMember(Value = "No")]
        No,

        [EnumMember(Value = "Yes, my insurance will cover all my losses.")]
        Yes,

        [EnumMember(Value = "Yes but I don\'t know if my insurance will cover all damages or for this event.")]
        Unsure
    }

    /// <summary>
    /// Applicant Options
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ApplicantOption
    {
        [EnumMember(Value = "Homeowner")]
        Homeowner,

        [EnumMember(Value = "Residential Tenant")]
        ResidentialTenant,

        [EnumMember(Value = "Small Business Owner (including landlords)")]
        SmallBusinessOwner,

        [EnumMember(Value = "Farm Owner)")]
        FarmOwner,

        [EnumMember(Value = "Charitable Organization (including non-profilts)")]
        CharitableOrganization
    }

    /// <summary>
    /// Farm Options
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum FarmOption
    {
        [EnumMember(Value = "General or Sole Proprietorship or DBA name")]
        General,

        [EnumMember(Value = "Corporate (Ltd./Inc.) Company")]
        Corporate,
    }

    /// <summary>
    /// Small Business Options
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum SmallBusinessOption
    {
        [EnumMember(Value = "General or Sole Proprietorship or DBA name")]
        General,

        [EnumMember(Value = "Corporate (Ltd./Inc.) Company")]
        Corporate,

        [EnumMember(Value = "Landlord")]
        Landlord,
    }
}
