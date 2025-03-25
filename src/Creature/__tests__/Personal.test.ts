import { TimeUnit } from '@wowfinder/ts-enums';
import { personalDefaults, importPersonalDetails } from '../Personal';
import { rawBaseCreatureFull } from '../../__mocks__';
const minimalBuilder = {
    fullName: personalDefaults.fullName,
};

describe('importPersonalDetails', () => {
    it('should build a personal details object with default values', () => {
        const personalDetails = importPersonalDetails(minimalBuilder);

        expect(personalDetails.fullName).toBe(personalDefaults.fullName);
        expect(personalDetails.faith).toBe(personalDefaults.faith);
        expect(personalDetails.origin).toBe(personalDefaults.origin);
        expect(personalDetails.hair).toBe(personalDefaults.hair);
        expect(personalDetails.eyes).toBe(personalDefaults.eyes);
        expect(personalDetails.skin).toBe(personalDefaults.skin);
        expect(personalDetails.gender).toBe(personalDefaults.gender);
        expect(personalDetails.alignment).toBe(personalDefaults.alignment);
        expect(personalDetails.height.inches).toBe(
            personalDefaults.height.inches,
        );
        expect(personalDetails.weight.pounds).toBe(
            personalDefaults.weight.pounds,
        );
        expect(personalDetails.age.convert(TimeUnit.year).value).toBe(
            personalDefaults.age.convert(TimeUnit.year).value,
        );
    });
    it('should build a personal details object with raw values', () => {
        const personalDetails = importPersonalDetails(
            rawBaseCreatureFull.personal,
        );

        expect(personalDetails.fullName).toBe(
            rawBaseCreatureFull.personal.fullName,
        );
        expect(personalDetails.faith).toBe(rawBaseCreatureFull.personal.faith);
        expect(personalDetails.origin).toBe(
            rawBaseCreatureFull.personal.origin,
        );
        expect(personalDetails.hair).toBe(rawBaseCreatureFull.personal.hair);
        expect(personalDetails.eyes).toBe(rawBaseCreatureFull.personal.eyes);
        expect(personalDetails.skin).toBe(rawBaseCreatureFull.personal.skin);
        expect(personalDetails.gender).toBe(
            rawBaseCreatureFull.personal.gender,
        );
        expect(personalDetails.alignment).toBe(
            rawBaseCreatureFull.personal.alignment,
        );
        expect(personalDetails.height.inches).toBe(
            rawBaseCreatureFull.personal.height,
        );
        expect(personalDetails.weight.pounds).toBe(
            rawBaseCreatureFull.personal.weight,
        );
        expect(personalDetails.age.convert(TimeUnit.year).value).toBe(
            rawBaseCreatureFull.personal.age,
        );
    });
    it('should build a personal details object from another one', () => {
        const baseObject = importPersonalDetails(rawBaseCreatureFull.personal);
        const copyObject = importPersonalDetails(baseObject);

        expect(copyObject.fullName).toBe(baseObject.fullName);
        expect(copyObject.faith).toBe(baseObject.faith);
        expect(copyObject.origin).toBe(baseObject.origin);
        expect(copyObject.hair).toBe(baseObject.hair);
        expect(copyObject.eyes).toBe(baseObject.eyes);
        expect(copyObject.skin).toBe(baseObject.skin);
        expect(copyObject.gender).toBe(baseObject.gender);
        expect(copyObject.alignment).toBe(baseObject.alignment);
        expect(copyObject.height.inches).toBe(baseObject.height.inches);
        expect(copyObject.weight.pounds).toBe(baseObject.weight.pounds);
        expect(copyObject.age.convert(TimeUnit.year).value).toBe(
            baseObject.age.convert(TimeUnit.year).value,
        );
    });
});
