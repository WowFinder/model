import { StagForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';
import { commonSpeedUnits } from '../../../../Scalar';

const mockedDruid: CharacterRequirementsPlaceholder = {
    baseProfile: mockDruidCreatureProfile,
    key: 'mocked-druid-profile',
};

describe('StagForm', () => {
    it('should be defined', () => {
        expect(StagForm).toBeDefined();
    });

    const stag = new StagForm({ rank: 1 });
    it('should be an instance of StagForm', () => {
        expect(stag).toBeInstanceOf(StagForm);
    });
    it('should include relevant modifiers', () => {
        const stag2 = stag.compute(mockedDruid, 2);
        expect(stag2).toBeDefined();
        // travel forms have no stats or casting mods
        expect(stag2.baseStats.dexterity).toBe(10);
        expect(stag2.casterLevelsBonus.spontaneous).toBe(0);
        expect(stag2.speeds.base.as(commonSpeedUnits.feetTurn)).toBeCloseTo(105);
    });
});

