namespace EMBC.DFA.API.ConfigurationModule.Models.Dynamics
{
    public class Country
    {
        public string era_countrycode { get; set; }
        public string era_name { get; set; }
        public bool statecode { get; set; }
    }

    public class dfa_appcontact
    {
        public string dfa_firstname { get; set; }
        public string dfa_lastname { get; set; }
        public string dfa_initial { get; set; }
        public string dfa_residencetelephonenumber { get; set; }
        public string dfa_cellphonenumber { get; set; }
        public string dfa_alternatephonenumber { get; set; }
        public string dfa_emailaddress { get; set; }
        public string dfa_bcservicecardid { get; set; }
        public string dfa_primaryaddressline1 { get; set; }
        public string? dfa_primaryaddressline2 { get; set; }
        public string? dfa_primarycity { get; set; }
        public string? dfa_primarystateprovince { get; set; }
        public string? dfa_primarypostalcode { get; set; }
        public string dfa_secondaryaddressline1 { get; set; }
        public string? dfa_secondaryaddressline2 { get; set; }
        public string? dfa_secondarycity { get; set; }
        public string? dfa_secondarystateprovince { get; set; }
        public string? dfa_secondarypostalcode { get; set; }
        public bool? dfa_isindigenous { get; set; }
        public int dfa_isprimaryandsecondaryaddresssame { get; set; }
    }

    public class dfa_appapplicationstart
    {
        public int dfa_applicanttype { get; set; } // required (already existing)
        public int dfa_doyouhaveinsurancecoverage2 { get; set; } // represents new field with new option set Dynamics Type New OptionSet (Yes, No, Yes But)
        public string dfa_appcontactid { get; set; } // string passed in to PROC, PROC looks up appcontact to fill in application fields
        public int dfa_primaryapplicantsignednoins { get; set; } // new field Dynamics Type OptionSet with existing Yes or No option set
        public string? dfa_primaryapplicantprintnamenoins { get; set; } // new field string Dynamics type string
        public string? dfa_primaryapplicantsigneddatenoins { get; set; } // new field string Dynamics Type Date and Time (Date Only)
        public byte[]? dfa_primaryapplicantsignaturenoins { get; set; } // new field Dynamics Type Image
        public int dfa_secondaryapplicantsignednoins { get; set; } // new field existing Dynamics Type OptionSet existing Yes or No option set
        public string? dfa_secondaryapplicantprintnamenoins { get; set; } // new field Dynamics Type string
        public string? dfa_secondaryapplicantsigneddatenoins { get; set; } // new field string Dynamics Type Date and Time (Date Only)
        public byte[]? dfa_secondaryapplicantsignaturenoins { get; set; } // new field Dynamics Type Image
    }

    public enum ApplicantTypeOptionSet
    {
        CharitableOrganization = 222710000,
        FarmOwner = 222710001,
        HomeOwner = 222710002,
        ResidentialTenant = 222710003,
        SmallBusinessOwner = 222710004,
        GovernmentBody = 222710005,
        Incorporated = 222710006
    }

    public enum YesNoOptionSet
    {
        Yes = 222710000,
        No = 222710001
    }

    public enum InsuranceTypeOptionSet
    {
        Yes = 222710000,
        No = 222710002,
        YesBut = 222710001
    }
}
