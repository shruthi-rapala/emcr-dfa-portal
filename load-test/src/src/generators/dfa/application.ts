import * as faker from 'faker/locale/en_CA';
import { ApplicantOption, DfaApplicationMain, DfaApplicationStart, InsuranceOption } from '../../api/dfa/models';

function generateNewApplication(): DfaApplicationStart {
    return {
      consent: {
        consent: true,
      },
      profileVerification: { profileVerified: true },
      appTypeInsurance: {
        applicantOption: ApplicantOption.Homeowner,
        insuranceOption: InsuranceOption.No,
        applicantSignature: {
          dateSigned: new Date().toISOString(),
          signature:
            "data:image/png;base64,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",
          signedName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        },
        secondaryApplicantSignature: null,
      },
    };
}

function generateMainApplication(applicationId: string): DfaApplicationMain {
    return {
        id: applicationId,
        cleanUpLog: {
            "haveInvoicesOrReceiptsForCleanupOrRepairs": null
        },
        damagedPropertyAddress: {
            addressLine1: `${faker.address.streetAddress()}`,
            addressLine2: null,
            community: faker.address.cityName(),
            postalCode: faker.address.zipCode(),
            stateProvince: "BC",
            occupyAsPrimaryResidence: faker.datatype.boolean(),
            onAFirstNationsReserve: false,
            firstNationsReserve: null,
            manufacturedHome: false,
            eligibleForHomeOwnerGrant: true,
            landlordGivenNames: null,
            landlordSurname: null,
            landlordPhone: null,
            landlordEmail: null,
            isPrimaryAndDamagedAddressSame: true
        },
        propertyDamage: {
            floodDamage: true,
            landslideDamage: true,
            stormDamage: null,
            otherDamage: null,
            otherDamageText: null,
            damageFromDate: "2023-10-01T07:00:00.000Z",
            damageToDate: "2023-10-10T07:00:00.000Z",
            briefDescription: faker.random.alphaNumeric(50),
            lossesExceed1000: true,
            wereYouEvacuated: false,
            dateReturned: null,
            residingInResidence: true
        },
        supportingDocuments: {
            hasCopyOfARentalAgreementOrLease: null
        },
        signAndSubmit: {
            applicantSignature: {
                dateSigned: null,
                signedName: null,
                signature: null
            },
            secondaryApplicantSignature: {
                dateSigned: null,
                signedName: null, signature: null
            }
        },
        deleteFlag: false
    }
}

export {
    generateNewApplication,
    generateMainApplication
}