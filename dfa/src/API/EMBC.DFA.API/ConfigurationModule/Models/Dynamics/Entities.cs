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

    public class dfa_appapplication
    {
        public string dfa_appapplicationid { get; set; }
        public string dfa_applicanttype { get; set; }
    }
}
