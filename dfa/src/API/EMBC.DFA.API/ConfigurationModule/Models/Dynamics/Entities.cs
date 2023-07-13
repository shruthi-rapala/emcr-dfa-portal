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
        //public string? dfa_name { get; set; }
        //public string? dfa_accountlegalname { get; set; }
        public int dfa_applicanttype { get; set; } // required
        public int dfa_insurancetype { get; set; } // represents new field with new option set
        public string dfa_appcontactid { get; set; } // passed in to PROC, PROC looks up appcontact
        public int? dfa_primaryapplicantsignednoins { get; set; } // new field with existing yes/no option set
        public string? dfa_primaryapplicantprintnamenoins { get; set; } // new field string
        public string? dfa_primaryapplicantsigneddatenoins { get; set; } // new field string
        public string? entityimagenoins { get; set; } // new field
        public int? dfa_secondaryapplicantsignednoins { get; set; } // new field existing yes/no option set
        public string? dfa_secondaryapplicantprintnamenoins { get; set; } // new field with existing yes/no option set (Yes or No)
        public string? dfa_secondaryapplicantsigneddatenoins { get; set; } // new field string Dynamics Type Date and Time (Date Only)
        public string? secondaryentityimagenoins { get; set; } // new field Dynamics Type Image
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
}
