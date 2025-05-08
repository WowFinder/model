import { CheetahForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';
import { commonSpeedUnits } from '../../../../Scalar';

const mockedDruid: CharacterRequirementsPlaceholder = {
    baseProfile: mockDruidCreatureProfile,
    key: 'mocked-druid-profile',
};

describe('CheetahForm', () => {
    it('should be defined', () => {
        expect(CheetahForm).toBeDefined();
    });

    const cheetah = new CheetahForm({ rank: 1 });
    it('should be an instance of CheetahForm', () => {
        expect(cheetah).toBeInstanceOf(CheetahForm);
    });
    it('should include relevant modifiers', () => {
        const cheetah2 = cheetah.compute(mockedDruid, 2);
        expect(cheetah2).toBeDefined();
        // travel forms have no stats or casting mods
        expect(cheetah2.baseStats.dexterity).toBe(10);
        expect(cheetah2.casterLevelsBonus.spontaneous).toBe(0);
        expect(cheetah2.speeds.base.as(commonSpeedUnits.feetTurn)).toBe(60);
    });
});

