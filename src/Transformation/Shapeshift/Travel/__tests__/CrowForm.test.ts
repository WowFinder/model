import { FlyManeuverability } from '@wowfinder/ts-enums';
import { CrowForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';
import { commonSpeedUnits } from '../../../../Scalar';

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
        // travel forms have no stats or casting mods
        expect(crow2.baseStats.dexterity).toBe(10);
        expect(crow2.casterLevelsBonus.spontaneous).toBe(0);
        expect(crow2.speeds.base.as(commonSpeedUnits.feetTurn)).toBe(30);
        expect(crow2.speeds.fly.as(commonSpeedUnits.feetTurn)).toBe(45);
        expect(crow2.speeds.maneuverability).toBe(FlyManeuverability.average);
    });
});

