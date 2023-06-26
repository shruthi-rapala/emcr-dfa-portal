using System.Linq;
using EMBC.ESS.Shared.Contracts.Events;
using EMBC.DFA.API.Controllers;
using EMBC.DFA.API.Mappers;
using Shouldly;
using Xunit;

namespace EMBC.Tests.Unit.DFA.API.Profiles
{
    public class MappingTests
    {
        private readonly AutoMapper.MapperConfiguration mapperConfig;
        private AutoMapper.IMapper mapper => mapperConfig.CreateMapper();

        public MappingTests()
        {
            mapperConfig = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddMaps(typeof(Mappings));
            });
        }

        [Fact]
        public void ValidateAutoMapperMappings()
        {
            mapperConfig.AssertConfigurationIsValid();
        }

        [Fact]
        public void CanMapProfileFromServerRegistrantProfile()
        {
            var registrantProfile = FakeGenerator.CreateServerRegistrantProfile();
            var profile = mapper.Map<Profile>(registrantProfile);

            profile.ShouldNotBeNull();

            profile.Id.ShouldBe(registrantProfile.UserId);
            
            profile.PersonalDetails.FirstName.ShouldBe(registrantProfile.FirstName);
            profile.PersonalDetails.LastName.ShouldBe(registrantProfile.LastName);
            profile.PersonalDetails.Initials.ShouldBe(registrantProfile.Initials);

            profile.ContactDetails.Email.ShouldBe(registrantProfile.Email);
            profile.ContactDetails.CellPhoneNumber.ShouldBe(registrantProfile.Phone);

            profile.PrimaryAddress.AddressLine1.ShouldBe(registrantProfile.PrimaryAddress.AddressLine1);
            profile.PrimaryAddress.AddressLine2.ShouldBe(registrantProfile.PrimaryAddress.AddressLine2);
            profile.PrimaryAddress.StateProvince.ShouldBe(registrantProfile.PrimaryAddress.StateProvince);
            profile.PrimaryAddress.PostalCode.ShouldBe(registrantProfile.PrimaryAddress.PostalCode);

            profile.MailingAddress.AddressLine1.ShouldBe(registrantProfile.MailingAddress.AddressLine1);
            profile.MailingAddress.AddressLine2.ShouldBe(registrantProfile.MailingAddress.AddressLine2);
            profile.MailingAddress.StateProvince.ShouldBe(registrantProfile.MailingAddress.StateProvince);
            profile.MailingAddress.PostalCode.ShouldBe(registrantProfile.MailingAddress.PostalCode);
        }

        [Fact]
        public void CanMapServerRegistrantProfileFromProfile()
        {
            var profile = FakeGenerator.CreateClientRegistrantProfile();
            var registrantProfile = mapper.Map<RegistrantProfile>(profile);

            registrantProfile.ShouldNotBeNull();

            registrantProfile.UserId.ShouldBe(profile.Id);
            //registrantProfile.SecretPhrase.ShouldBe(profile.SecretPhrase);
            
            registrantProfile.FirstName.ShouldBe(profile.PersonalDetails.FirstName);
            registrantProfile.LastName.ShouldBe(profile.PersonalDetails.LastName);
            registrantProfile.Initials.ShouldBe(profile.PersonalDetails.Initials);

            registrantProfile.Email.ShouldBe(profile.ContactDetails.Email);
            registrantProfile.Phone.ShouldBe(profile.ContactDetails.CellPhoneNumber);

            registrantProfile.PrimaryAddress.AddressLine1.ShouldBe(profile.PrimaryAddress.AddressLine1);
            registrantProfile.PrimaryAddress.AddressLine2.ShouldBe(profile.PrimaryAddress.AddressLine2);
            registrantProfile.PrimaryAddress.StateProvince.ShouldBe(profile.PrimaryAddress.StateProvince);
            registrantProfile.PrimaryAddress.PostalCode.ShouldBe(profile.PrimaryAddress.PostalCode);

            registrantProfile.MailingAddress.AddressLine1.ShouldBe(profile.MailingAddress.AddressLine1);
            registrantProfile.MailingAddress.AddressLine2.ShouldBe(profile.MailingAddress.AddressLine2);
            registrantProfile.MailingAddress.StateProvince.ShouldBe(profile.MailingAddress.StateProvince);
            registrantProfile.MailingAddress.PostalCode.ShouldBe(profile.MailingAddress.PostalCode);
        }

        //[Fact]
        //public void CanMapBcscUserToProfile()
        //{
        //    var bcscUser = FakeGenerator.CreateUser("BC", "CAN");
        //    var profile = mapper.Map<Profile>(bcscUser);

        //    profile.Id.ShouldBe(bcscUser.Id);
        //    profile.ContactDetails.Email.ShouldBeNull();
        //    profile.PersonalDetails.FirstName.ShouldBe(bcscUser.PersonalDetails.FirstName);
        //    profile.PersonalDetails.LastName.ShouldBe(bcscUser.PersonalDetails.LastName);
        //    profile.PersonalDetails.Gender.ShouldBeNull();
        //    profile.PersonalDetails.DateOfBirth.ShouldBe(Regex.Replace(bcscUser.PersonalDetails.DateOfBirth,
        //        @"\b(?<year>\d{2,4})-(?<month>\d{1,2})-(?<day>\d{1,2})\b", "${month}/${day}/${year}", RegexOptions.None));
        //    profile.PrimaryAddress.AddressLine1.ShouldBe(bcscUser.PrimaryAddress.AddressLine1);
        //    profile.PrimaryAddress.PostalCode.ShouldBe(bcscUser.PrimaryAddress.PostalCode);
        //    profile.PrimaryAddress.Community.ShouldBe(bcscUser.PrimaryAddress.Community);
        //    profile.PrimaryAddress.StateProvince.ShouldNotBeNull().ShouldBe("BC");
        //    profile.PrimaryAddress.Country.ShouldNotBeNull().ShouldBe("CAN");
        //}
    }
}
