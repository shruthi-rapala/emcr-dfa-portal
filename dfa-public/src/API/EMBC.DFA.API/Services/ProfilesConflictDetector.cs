﻿using System;
using System.Collections.Generic;
using EMBC.DFA.API.Controllers;

namespace EMBC.DFA.API.Services
{
    public static class ProfilesConflictDetector
    {
        public static IEnumerable<ProfileDataConflict> DetectAddressConflicts(Profile source)
        {
            if (source.PrimaryAddress != null && source.MailingAddress != null && !source.PrimaryAddress.AddressEquals(source.MailingAddress))
            {
                yield return new AddressDataConflict
                {
                    OriginalValue = source.PrimaryAddress,
                    ConflictingValue = source.MailingAddress,
                };
            }
        }

        public static IEnumerable<ProfileDataConflict> DetectConflicts(Profile source, Profile target)
        {
            if (source == null || target == null) yield break;
            if (source.PersonalDetails != null)
            {
                //yield return new DateOfBirthDataConflict
                //{
                //    OriginalValue = source.PersonalDetails?.DateOfBirth,
                //    ConflictingValue = target.PersonalDetails?.DateOfBirth
                //};
            }
            if (source.PersonalDetails != null && !source.PersonalDetails.NameEquals(target.PersonalDetails))
            {
                yield return new NameDataConflict
                {
                    OriginalValue = new ProfileName { FirstName = source.PersonalDetails?.FirstName, LastName = source.PersonalDetails?.LastName },
                    ConflictingValue = new ProfileName { FirstName = target.PersonalDetails?.FirstName, LastName = target.PersonalDetails?.LastName },
                };
            }
            if (source.PrimaryAddress != null && !source.PrimaryAddress.AddressEquals(target.PrimaryAddress))
            {
                yield return new AddressDataConflict
                {
                    OriginalValue = source.PrimaryAddress,
                    ConflictingValue = target.PrimaryAddress,
                };
            }
        }

        private static bool AddressEquals(this Address address, Address other) =>
            (address == null && other == null) ||
            (address != null &&
            address.AddressLine1.StringSafeEquals(other?.AddressLine1) &&
            address.AddressLine2.StringSafeEquals(other?.AddressLine2) &&
            address.PostalCode.StringSafeEquals(other?.PostalCode) &&
            address.City.StringSafeEquals(other?.City));

        private static bool NameEquals(this PersonDetails personDetails, PersonDetails other) =>
            personDetails != null &&
            personDetails.FirstName.StringSafeEquals(other?.FirstName) &&
            personDetails.LastName.StringSafeEquals(other?.LastName);

        private static bool StringSafeEquals(this string s, string other) =>
            string.Equals((s ?? string.Empty).Trim(), (other ?? string.Empty).Trim(), StringComparison.InvariantCultureIgnoreCase);
    }
}
