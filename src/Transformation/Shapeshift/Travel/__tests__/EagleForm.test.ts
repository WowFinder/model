import { FlyManeuverability } from '@wowfinder/ts-enums';
import { EagleForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';

const mockedDruid: CharacterRequirementsPlaceholder = {
    baseProfile: mockDruidCreatureProfile,
    key: 'mocked-druid-profile',
};

describe('EagleForm', () => {
    it('should be defined', () => {
        expect(EagleForm).toBeDefined();
    });

    const eagle = new EagleForm({ rank: 1 });
    it('should be an instance of EagleForm', () => {
        expect(eagle).toBeInstanceOf(EagleForm);
    });
    it('should include relevant modifiers', () => {
        const eagle2 = eagle.compute(mockedDruid, 2);
        expect(eagle2).toBeDefined();
        expect(eagle2.speeds?.base).toBe(30);
        expect(eagle2.speeds?.fly).toBeCloseTo(105);
        expect(eagle2.speeds?.maneuverability).toBe(FlyManeuverability.perfect);
    });
});
