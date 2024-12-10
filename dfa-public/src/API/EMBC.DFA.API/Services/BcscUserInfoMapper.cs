﻿using System;
using System.Linq;
using System.Text.Json;
using EMBC.DFA.API.Controllers;

namespace EMBC.DFA.API.Services
{
    public static class BcscTokenKeys
    {
        public const string Id = "sub";
        public const string GivenName = "given_name";
        public const string FamilyName = "family_name";
        public const string Address = "address";
        public const string AddressStreet = "street_address";
        public const string AddressCountry = "country";
        public const string AddressLocality = "locality";
        public const string AddressRegion = "region";
        public const string AddressPostalCode = "postal_code";
        public const string AddressFormatted = "formatted";
        public const string DisplayName = "display_name";
        public const string BirthDate = "birthdate";
        public const string Gender = "gender";
        public const string Email = "email";
    }

    public static class BcscUserInfoMapper
    {
        //public static Profile GetDummyProfile(string userId) => MapBCSCUserDataToProfile(userId, JsonDocument.Parse(
        //    $"{{" +
        //    $"\"{BcscTokenKeys.GivenName}\": \"dummygiver\"," +
        //    $" \"{BcscTokenKeys.FamilyName}\": \"dummyfamily\"," +
        //    $" \"{BcscTokenKeys.BirthDate}\": \"2000-01-13\"," +
        //    $" \"{BcscTokenKeys.Address}\": {{" +
        //    $" \"{BcscTokenKeys.AddressStreet}\": \"dummystreet\"," +
        //    $" \"{BcscTokenKeys.AddressRegion}\": \"BC\"," +
        //    $" \"{BcscTokenKeys.AddressCountry}\": \"CA\"," +
        //    $" \"{BcscTokenKeys.AddressPostalCode}\": \"V1V 1V1\"," +
        //    $" \"{BcscTokenKeys.AddressLocality}\": \"Vancouver\"" +
        //    $"}}" +
        //    $"}}"));

        public static Profile MapBcscUserInfoToProfile(string userId, JsonDocument userData)
        {
            return new Profile
            {
                Id = userId,
                PersonalDetails = new PersonDetails
                {
                    FirstName = userData.RootElement.AttemptToGetProperty(BcscTokenKeys.GivenName)?.GetString(),
                    LastName = userData.RootElement.AttemptToGetProperty(BcscTokenKeys.FamilyName)?.GetString(),
                },
                ContactDetails = new ContactDetails
                {
                    Email = userData.RootElement.AttemptToGetProperty(BcscTokenKeys.Email)?.GetString(),
                },
                PrimaryAddress = new Address
                {
                    AddressLine1 = userData.RootElement.AttemptToGetProperty(BcscTokenKeys.Address)?.AttemptToGetProperty(BcscTokenKeys.AddressStreet)?.GetString(),
                    StateProvince = userData.RootElement.AttemptToGetProperty(BcscTokenKeys.Address)?.AttemptToGetProperty(BcscTokenKeys.AddressRegion)?.GetString(),
                    PostalCode = string.Concat(userData.RootElement.AttemptToGetProperty(BcscTokenKeys.Address)?.AttemptToGetProperty(BcscTokenKeys.AddressPostalCode)?.GetString().Where(c => !char.IsWhiteSpace(c))),
                    City = userData.RootElement.AttemptToGetProperty(BcscTokenKeys.Address)?.AttemptToGetProperty(BcscTokenKeys.AddressLocality)?.GetString()
                }
            };
        }

        private static string FormatDateOfBirth(string bcscFormattedBirthDate)
        {
            if (string.IsNullOrEmpty(bcscFormattedBirthDate)) return null;
            if (!DateTime.TryParse(bcscFormattedBirthDate, out var date)) return null;
            return date.ToString("MM'/'dd'/'yyyy");
        }
    }

    public static class JsonEx
    {
        public static JsonElement? AttemptToGetProperty(this JsonElement jsonElement, string propertyName) =>
           jsonElement.TryGetProperty(propertyName, out var underlyingJsonElement) ? (JsonElement?)underlyingJsonElement : null;
    }
}
