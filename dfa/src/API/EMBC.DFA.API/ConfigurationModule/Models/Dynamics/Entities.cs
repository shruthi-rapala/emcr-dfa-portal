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
        public string dfa_bcservicescardid { get; set; }
        public string dfa_primaryaddressline1 { get; set; }
        public string? dfa_primaryaddressline2 { get; set; }
        public string? dfa_primarycity { get; set; }
        public string? dfa_primarystateprovince { get; set; }
        public string? dfa_primarypostalcode { get; set; }
        public string dfa_currentaddressline1 { get; set; }
        public string? dfa_currentaddressline2 { get; set; }
        public string? dfa_currentcity { get; set; }
        public string? dfa_currentstateprovince { get; set; }
        public string? dfa_currentpostalcode { get; set; }
        public string? dfa_isindigenous { get; set; }
        public string? dfa_iscurrentaddresssameasprimary { get; set; }
    }
}
