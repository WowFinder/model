import { FlyManeuverability } from '@wowfinder/ts-enums';
import { CrowForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';

const mockedDruid: CharacterRequirementsPlaceholder = {
    baseProfile: mockDruidCreatureProfile,
    key: 'mocked-druid-profile',
};

describe('CrowForm', () => {
    it('should be defined', () => {
        expect(CrowForm).toBeDefined();
    });

    const crow = new CrowForm({ rank: 1 });
    it('should be an instance of CrowForm', () => {
        expect(crow).toBeInstanceOf(CrowForm);
    });
    it('should include relevant modifiers', () => {
        const crow2 = crow.compute(mockedDruid, 2);
        expect(crow2).toBeDefined();
        expect(crow2.speeds?.base).toBe(30);
        expect(crow2.speeds?.fly).toBe(45);
        expect(crow2.speeds?.maneuverability).toBe(FlyManeuverability.average);
    });
});
