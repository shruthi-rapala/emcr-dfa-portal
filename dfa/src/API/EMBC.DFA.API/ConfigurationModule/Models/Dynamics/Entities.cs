using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Runtime.InteropServices;
using System.Runtime.Serialization.Json;
using System.Text;
using Org.BouncyCastle.Asn1.Mozilla;
using Org.BouncyCastle.Bcpg.OpenPgp;

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
        public int? dfa_isprimaryandsecondaryaddresssame { get; set; }
        public string dfa_appcontactid { get; set; }
    }

    public class dfa_appcontact_extended : dfa_appcontact
    {
        public string? dfa_title { get; set; }
        public string? dfa_name { get; set; }
    }

    public class dfa_appapplicationstart_params
    {
        public int dfa_applicanttype { get; set; } // required (already existing)
        public int dfa_doyouhaveinsurancecoverage2 { get; set; } // required
        public string dfa_appcontactid { get; set; } // required string passed in to PROC, PROC looks up appcontact to fill in application fields
        public int dfa_primaryapplicantsignednoins { get; set; } // required Yes or No option set
        public string? dfa_primaryapplicantprintnamenoins { get; set; } // optional string
        public string? dfa_primaryapplicantsigneddatenoins { get; set; } // optional Date and Time (Date Only)
        public int dfa_secondaryapplicantsignednoins { get; set; } // required OptionSet existing Yes or No option set
        public string? dfa_secondaryapplicantprintnamenoins { get; set; } // optional string
        public string? dfa_secondaryapplicantsigneddatenoins { get; set; } // optional  Date and Time (Date Only)
    }

    public class dfa_signature
    {
        public string signature { get; set; }
        public string filename { get; set; }
        public string dfa_appapplicationid { get; set; }
    }

    public class JsonHelper
    {
        internal static string JsonSerializer<T>(T t)
        {
            string jsonString = null;
            using (MemoryStream ms = new MemoryStream())
            {
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
                ser.WriteObject(ms, t);
                jsonString = Encoding.UTF8.GetString(ms.ToArray());
            }
            return jsonString;
        }

        internal static T JsonDeserialize<T>(string jsonString)
        {
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
            T obj = (T)ser.ReadObject(ms);
            return obj;
        }
    }

    public class dfa_appapplicationstart_retrieve
    {
        public string? dfa_appapplicationid { get; set; } // optional string
        public int? dfa_applicanttype { get; set; } // required (already existing)
        public int? dfa_doyouhaveinsurancecoverage2 { get; set; } // required
        public int? dfa_primaryapplicantsignednoins { get; set; } // required Yes or No option set
        public string? dfa_primaryapplicantprintnamenoins { get; set; } // optional string
        public string? dfa_primaryapplicantsigneddatenoins { get; set; } // optional Date and Time (Date Only)
        public int? dfa_secondaryapplicantsignednoins { get; set; } // required OptionSet existing Yes or No option set
        public string? dfa_secondaryapplicantprintnamenoins { get; set; } // optional string
        public string? dfa_secondaryapplicantsigneddatenoins { get; set; } // optional  Date and Time (Date Only)
        public string? _dfa_applicant_value { get; set; }
    }

    public class dfa_appapplicationmain_params
    {
        public string dfa_appapplicationid { get; set; } // required
        public int? dfa_isprimaryanddamagedaddresssame2 { get; set; } // optional Two Options
        public string? dfa_damagedpropertystreet1 { get; set; } // optional string
        public string? dfa_damagedpropertystreet2 { get; set; } // optional string
        public string? dfa_damagedpropertycitytext { get; set; } // optional string
        public string? dfa_damagedpropertyprovince { get; set; } // optional string
        public string? dfa_damagedpropertypostalcode { get; set; } // optional string
        public int? dfa_isthispropertyyourp2 { get; set; } // optional boolean
        public int? dfa_indigenousreserve2 { get; set; } // optional boolean
        public string? dfa_nameoffirstnationsr { get; set; } // optional string
        public int? dfa_manufacturedhom2 { get; set; } // optional boolean
        public int? dfa_eligibleforbchomegrantonthisproperty2 { get; set; } // optional boolean
        public string? dfa_contactfirstname { get; set; } // optional string
        public string? dfa_contactlastname { get; set; } // optional string
        public string? dfa_contactphone1 { get; set; } // optional string
        public string? dfa_contactemail { get; set; } // optional string
        public int? dfa_acopyofarentalagreementorlease2 { get; set; } // required boolean
        public int? dfa_areyounowresidingintheresidence2 { get; set; } // optional boolean
        public int? dfa_causeofdamageflood2 { get; set; } // optional boolean
        public int? dfa_causeofdamagestorm2 { get; set; } // optoinal boolean
        public int? dfa_causeofdamagewildfire2 { get; set; } // optional boolean
        public int? dfa_causeofdamagelandslide2 { get; set; } // optional boolean
        public int? dfa_causeofdamageother2 { get; set; } // optional boolean
        public string? dfa_causeofdamageloss { get; set; } // optional string
        public string? dfa_dateofdamage { get; set; } // optoinal date only
        public string? dfa_dateofdamageto { get; set; } // optional date only
        public string? dfa_datereturntoresidence { get; set; } // optional date only
        public string? dfa_description { get; set; } // optional string
        public int? dfa_doyourlossestotalmorethan10002 { get; set; } // optional boolean
        public int? dfa_havereceiptsforcleanupsorrepairs { get; set; } // required boolean
        public string? dfa_primaryapplicantprintname { get; set; } // optional string
        public int dfa_primaryapplicantsigned { get; set; } // required Two Options
        public string? dfa_primaryapplicantsigneddate { get; set; } // optional string
        public string? dfa_secondaryapplicantprintname { get; set; } // optional string
        public int dfa_secondaryapplicantsigned { get; set; } // required Two Options
        public string? dfa_secondaryapplicantsigneddate { get; set; } // optional string
        public int? dfa_wereyouevacuatedduringtheevent2 { get; set; } // optional boolean
        public bool delete { get; set; } // delete or not
    }

    public class dfa_appapplicationmain_retrieve
    {
        public string dfa_appapplicationid { get; set; } // required
        public int? dfa_isprimaryanddamagedaddresssame2 { get; set; } // optional boolean
        public string? dfa_damagedpropertystreet1 { get; set; } // optional string
        public string? dfa_damagedpropertystreet2 { get; set; } // optional string
        public string? dfa_damagedpropertycitytext { get; set; } // optional string
        public string? dfa_damagedpropertyprovince { get; set; } // optional string
        public string? dfa_damagedpropertypostalcode { get; set; } // optional string
        public int? dfa_isthispropertyyourp2 { get; set; } // optional Two Options
        public int? dfa_indigenousreserve2 { get; set; } // optional Two Options
        public string? dfa_nameoffirstnationsr { get; set; } // optional string
        public int? dfa_manufacturedhom2 { get; set; } // optional Two Options
        public int? dfa_eligibleforbchomegrantonthisproperty2 { get; set; } // optional Two Options
        public string? dfa_contactfirstname { get; set; } // optional string
        public string? dfa_contactlastname { get; set; } // optional string
        public string? dfa_contactphone1 { get; set; } // optional string
        public string? dfa_contactemail { get; set; } // optional string
        public int? dfa_acopyofarentalagreementorlease2 { get; set; } // required Two Options
        public int? dfa_areyounowresidingintheresidence2 { get; set; } // optional Two Options
        public int? dfa_causeofdamageflood2 { get; set; } // optional Two Options
        public int? dfa_causeofdamagestorm2 { get; set; } // optoinal Two Options
        public int? dfa_causeofdamagewildfire2 { get; set; } // optional Two Options
        public int? dfa_causeofdamagelandslide2 { get; set; } // optional Two Options
        public int? dfa_causeofdamageother2 { get; set; } // optional Two Options
        public string? dfa_causeofdamageloss { get; set; } // optional string
        public string? dfa_dateofdamage { get; set; } // optoinal date only
        public string? dfa_dateofdamageto { get; set; } // optional date only
        public string? dfa_datereturntotheresidence { get; set; } // optional date only
        public string? dfa_description { get; set; } // optional string
        public int? dfa_doyourlossestotalmorethan10002 { get; set; } // optional Two Options
        public int? dfa_haveinvoicesreceiptsforcleanuporrepairs { get; set; } // required Two Options
        public string? dfa_primaryapplicantprintname { get; set; } // optional string
        public int? dfa_primaryapplicantsigned { get; set; } // required Two Options
        public string? dfa_primaryapplicantsigneddate { get; set; } // optional string
        public string? dfa_secondaryapplicantprintname { get; set; } // optional string
        public int? dfa_secondaryapplicantsigned { get; set; } // required Two Options
        public string? dfa_secondaryapplicantsigneddate { get; set; } // optional string
        public int? dfa_wereyouevacuatedduringtheevent2 { get; set; } // optional Two Options
        public string? _dfa_confirmedbuildinglandlord_value { get; set; } // optional string
    }

    public class dfa_appbuildingownerlandlord
    {
        public string? dfa_contactlastname { get; set; } // optional string
        public string? dfa_contactfirstname { get; set; } // optional string
        public string? dfa_contactphone1 { get; set; } // optional string
        public string? dfa_contactemail { get; set; } // optional string
    }

    public class dfa_appsecondaryapplicant_retrieve
    {
        public string? dfa_appsecondaryapplicantid { get; set; } // optional string
        public int dfa_applicanttype { get; set; } // required enum
        public string dfa_emailaddress { get; set; } // required string
        public string dfa_firstname { get; set; } // required string
        public string dfa_lastname { get; set; } // required string
        public string dfa_phonenumber { get; set; } // required string
        public string _dfa_appapplicationid_value { get; set; }
    }

    public class dfa_appsecondaryapplicant_params
    {
        public Guid dfa_appapplicationid { get; set; } // required string
        public Guid? dfa_appsecondaryapplicantid { get; set; } // optional string
        public int dfa_applicanttype { get; set; } // required enum
        public string dfa_emailaddress { get; set; } // required string
        public string dfa_firstname { get; set; } // required string
        public string dfa_lastname { get; set; } // required string
        public string dfa_phonenumber { get; set; } // required string
        public bool delete { get; set; } // required enum
    }

    public class dfa_appothercontact_retrieve
    {
        public string? dfa_appothercontactid { get; set; } // optional string
        public string dfa_emailaddress { get; set; } // required string
        public string dfa_firstname { get; set; } // required string
        public string dfa_lastname { get; set; } // required string
        public string dfa_phonenumber { get; set; } // required string
        public string? _dfa_appapplicationid_value { get; set; } // optional string
        public string? dfa_name { get; set; } // optional string
    }

    public class dfa_appothercontact_params
    {
        public Guid dfa_appapplicationid { get; set; } // required string
        public Guid? dfa_appothercontactid { get; set; } // optional string
        public string dfa_appemailaddress { get; set; } // required string
        public string dfa_firstname { get; set; } // required string
        public string dfa_lastname { get; set; } // required string
        public string dfa_phonenumber { get; set; } // required string
        public bool delete { get; set; } // required enum
    }

    public class dfa_appoccupant_retrieve
    {
        public string? dfa_appoccupantid { get; set; } // optional string
        public string dfa_name { get; set; } // required string
        public string dfa_title { get; set; } // required string
        public string dfa_firstname { get; set; } // required string
        public string dfa_lastname { get; set; } // required string
        public string? _dfa_applicationid_value { get; set; } // for retrieving from entity
        public string? _dfa_contactid_value { get; set; } // for retrieving
    }

    public class dfa_appoccupant_params
    {
        public Guid dfa_appapplicationid { get; set; } // required string
        public Guid? dfa_appoccupantid { get; set; } // optional string
        public string dfa_name { get; set; } // required string
        public string dfa_title { get; set; } // required string
        public string dfa_firstname { get; set; } // required string
        public string dfa_lastname { get; set; } // required string
        public bool delete { get; set; } // required enum
    }

    public class dfa_appcleanuplogs_retrieve
    {
        public string? dfa_appcleanuplogid { get; set; } // optional string
        public string dfa_name { get; set; } // required string
        public string? dfa_date { get; set; } // optional string
        public decimal? dfa_hoursworked { get; set; } // optional string
        public string dfa_description { get; set; } // required string
        public string? _dfa_applicationid_value { get; set; } // optional string
        public string? _dfa_contactid_value { get; set; } // optional string
    }

    public class dfa_appcleanuplogs_params
    {
        public Guid dfa_applicationid { get; set; } // required string ??? table vs process app or not app for process
        public Guid? dfa_appcleanuplogid { get; set; } // optional string
        public string dfa_name { get; set; } // required string with description of work
        public string? dfa_appcontactname { get; set; } // required string with app contact name
        public string? dfa_date { get; set; } // optional string
        public decimal? dfa_hoursworked { get; set; } // optional string
        public bool delete { get; set; } // required enum
    }

    // TODO add dfa_documentdescription, dfa_uploadeddate, dfa_modifiedby, dfa_contenttype fields
    public class dfa_appdocumentlocation_retrieve
    {
        public string? dfa_appdocumentlocationid { get; set; } // optional string
        public string dfa_name { get; set; } // required string
        public string dfa_documenttype { get; set; } // required string
        public string? dfa_documentdescription { get; set; } // optional string  *** NEW FIELD
        public string dfa_uploadeddate { get; set; } // required string ** NEW FIELD timestamp
        public string dfa_modifiedby { get; set; } // required string *** NEW FIELD string
        public string dfa_filedata { get; set; } // required string
        public string dfa_contenttype { get; set; } // required string ** NEW FIELD
        public int dfa_filesize { get; set; } // required int ** NEW FIELD
        public string? _dfa_applicationid_value { get; set; } // optional string
    }
    public class dfa_appdocumentlocation_params
    {
        public Guid dfa_applicationid { get; set; } // required string
        public Guid? dfa_appdocumentlocationid { get; set; } // optional string
        public string dfa_name { get; set; } // required string
        public string dfa_documenttype { get; set; } // required string
        public string? dfa_documentdescription { get; set; } // optional string  *** NEW FIELD
        public string dfa_uploadeddate { get; set; } // required string ** NEW FIELD timestamp
        public string dfa_modifiedby { get; set; } // required string *** NEW FIELD string
        public string dfa_contenttype { get; set; } // required string ** NEW FIELD
        public int dfa_filesize { get; set; } // required int ** NEW FIELD
        public byte[]? dfa_filecontent { get; set; } // required byte array
        public bool delete { get; set; } // required bool
    }

    public class dfa_appdamageditems_retrieve
    {
        public string? dfa_appdamageditemid { get; set; } // optional string
        public string dfa_roomname { get; set; } // required string
        public string dfa_damagedescription { get; set; } // required string
        public string? _dfa_applicationid_value { get; set; } // optional string for retrieving
    }

    public class dfa_appdamageditems_params
    {
        public Guid dfa_applicationid { get; set; } // required string
        public Guid? dfa_appdamageditemid { get; set; } // optional string
        public string dfa_roomname { get; set; } // required string
        public string dfa_damagedescription { get; set; } // required string
        public bool delete { get; set; } // required boolean
    }

    public enum ApplicantTypeOptionSet
    {
        [Description("Charitable Organization")]
        CharitableOrganization = 222710000,

        [Description("Farm Owner")]
        FarmOwner = 222710001,

        [Description("Home Owner")]
        HomeOwner = 222710002,

        [Description("Residential Tenant")]
        ResidentialTenant = 222710003,

        [Description("Small Business Owner")]
        SmallBusinessOwner = 222710004,

        [Description("Government Body")]
        GovernmentBody = 222710005,

        [Description("Incorporated")]
        Incorporated = 222710006
    }

    public enum SecondaryApplicantTypeOptionSet
    {
        Contact = 222710006,
        Organization = 222710000
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

    public class dfa_appapplication
    {
        public string dfa_appapplicationid { get; set; }
        public string dfa_applicanttype { get; set; }
        public string dfa_dateofdamage { get; set; }
        public string dfa_damagedpropertystreet1 { get; set; }
        public string dfa_damagedpropertycitytext { get; set; }
        public string _dfa_eventid_value { get; set; }
        public string _dfa_casecreatedid_value { get; set; }
        public string dfa_event { get; set; }
        public string dfa_casenumber { get; set; }
        public string dfa_primaryapplicantsigneddate { get; set; }
    }

    public class dfa_event
    {
        public string dfa_eventid { get; set; }
        public string dfa_id { get; set; }
    }

    public class dfa_incident
    {
        public string incidentid { get; set; }
        public string ticketnumber { get; set; }
    }

    public enum SameAddressOptionSet
    {
        [Description("Yes")]
        Yes = 222710000,

        [Description("No")]
        No = 222710001,

        [Description("I don't have a permanent address right now")]
        NoAddress = 222710002
    }
}
