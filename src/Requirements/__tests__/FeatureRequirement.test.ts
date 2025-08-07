import { mockedBruteCharacter, mockedDruidCharacter } from '../../__mocks__';
import { ClassFeatureRequirement } from '../FeatureRequirement';

describe('ClassFeatureRequirement', () => {
    it('should require a specific class feature', () => {
        const requirement = new ClassFeatureRequirement('tauntAttack');
        expect(requirement.test(mockedBruteCharacter)).toBe(true);
        expect(requirement.test(mockedDruidCharacter)).toBe(false);
    });

    it('should return the feature name', () => {
        const requirement = new ClassFeatureRequirement('bloodline');
        expect(requirement.feature).toBe('bloodline');
    });

    it('should not match if the feature is not present', () => {
        const requirement = new ClassFeatureRequirement('wildEmpathy');
        expect(requirement.test(mockedBruteCharacter)).toBe(false);
        expect(requirement.test(mockedDruidCharacter)).toBe(true);
    });
});
