import { FlyManeuverability } from '@wowfinder/ts-enums';
import { EagleForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';
import { commonSpeedUnits } from '../../../../Scalar';

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
        // travel forms have no stats or casting mods
        expect(eagle2.baseStats.dexterity).toBe(10);
        expect(eagle2.casterLevelsBonus.spontaneous).toBe(0);
        expect(eagle2.speeds.base.as(commonSpeedUnits.feetTurn)).toBe(30);
        expect(eagle2.speeds.fly.as(commonSpeedUnits.feetTurn)).toBeCloseTo(105);
        expect(eagle2.speeds.maneuverability).toBe(FlyManeuverability.perfect);
    });
});

