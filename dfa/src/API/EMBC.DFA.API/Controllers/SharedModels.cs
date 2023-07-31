﻿using System.Collections.Generic;
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
        public string? IndigenousStatus { get; set; }
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

    /// <summary>
    /// Secondary Applicant Type Options
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum SecondaryApplicantTypeOption
    {
        [EnumMember(Value = "Contact")]
        Contact,

        [EnumMember(Value = "Organization")]
        Organization,
    }

    /// <summary>
    /// File Category Options
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum FileCategory
    {
        [EnumMember(Value = "Insurance")]
        Insurance,

        [EnumMember(Value = "Financial")]
        Financial,

        [EnumMember(Value = "Third party consent")]
        ThirdPartyConsent,

        [EnumMember(Value = "Tenancy proof")]
        TenancyProof,

        [EnumMember(Value = "Damage photo")]
        DamagePhoto,

        [EnumMember(Value = "Cleanup")]
        Cleanup,

        [EnumMember(Value = "Appeal")]
        Appeal,

        [EnumMember(Value = "Identification")]
        Identification,

        [EnumMember(Value = "Unknown")]
        Unknown
    }

    /// <summary>
    /// Room Types
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum RoomType
    {
        [EnumMember(Value = "Bathroom")]
        Bathroom,

        [EnumMember(Value = "Bedroom")]
        Bedroom,

        [EnumMember(Value = "Dining room")]
        Dining,

        [EnumMember(Value = "Family room")]
        Family,

        [EnumMember(Value = "Garage")]
        Garage,

        [EnumMember(Value = "Kitchen")]
        Kitchen,

        [EnumMember(Value = "Laundry room")]
        Laundry,

        [EnumMember(Value = "Living room")]
        Living,

        [EnumMember(Value = "Other")]
        Other
    }

    /// <summary>
    /// Damaged Property Address
    /// </summary>
    public class DamagedPropertyAddress
    {
        public string? addressLine1 { get; set; }
        public string? addressLine2 { get; set; }
        public string? community { get; set; }
        public string? postalCode { get; set; }
        public string? stateProvince { get; set; }
        public bool? occupyAsPrimaryResidence { get; set; }
        public bool? onAFirstNationsReserve { get; set; }
        public string? firstNationsReserve { get; set; }
        public bool? manufacturedHome { get; set; }
        public bool? eligibleForHomeOwnerGrant { get; set; }
        public string? landlordGivenNames { get; set; }
        public string? landlordSurname { get; set; }
        public string? landlordPhone { get; set; }
        public string? landlordEmail { get; set; }
        public bool? isPrimaryAndDamagedAddressSame { get; set; }
    }

    /// <summary>
    /// Property Damage
    /// </summary>
    public class PropertyDamage
    {
        public bool? floodDamage { get; set; }
        public bool? landslideDamage { get; set; }
        public bool? wildfireDamage { get; set; }
        public bool? stormDamage { get; set; }
        public bool? otherDamage { get; set; }
        public string? otherDamageText { get; set; }
        public string? damageFromDate { get; set; }
        public string? damageToDate { get; set; }
        public string? briefDescription { get; set; }
        public bool? lossesExceed1000 { get; set; }
        public bool? wereYouEvacuated { get; set; }
        public string? dateReturned { get; set; }
        public bool? residingInResidence { get; set; }
    }

    /// <summary>
    /// Clean Up Log
    /// </summary>
    public class CleanUpLog
    {
        public bool? haveInvoicesOrReceiptsForCleanupOrRepairs { get; set; }
    }

    /// <summary>
    /// Supporting Documents
    /// </summary>
    public class SupportingDocuments
    {
        public bool hasCopyOfARentalAgreementOrLease { get; set; }
    }

    /// <summary>
    /// Damaged Property Address
    /// </summary>
    public class SignAndSubmit
    {
        public SignatureBlock? applicantSignature { get; set; }
        public SignatureBlock? secondaryApplicantSignature { get; set; }
    }
}