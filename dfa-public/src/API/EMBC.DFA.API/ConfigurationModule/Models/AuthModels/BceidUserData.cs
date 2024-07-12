using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace EMBC.DFA.API.ConfigurationModule.Models.AuthModels
{
    public class BceidUserData
    {
        public string sid { get; set; }
        public Guid bceid_business_guid { get; set; }
        public string bceid_business_name { get; set; }
        public Guid bceid_user_guid { get; set; }
        public string bceid_username { get; set; }
        public bool email_verified { get; set; }
        public string name { get; set; }
        public string preferred_username { get; set; }
        public string given_name { get; set; }
        public string display_name { get; set; }
        public string family_name { get; set; }
        [Description("emailaddress")]
        public string emailaddress { get; set; }
    }
}
