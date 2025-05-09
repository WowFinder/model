import { MoonkinForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';

const mockedDruid: CharacterRequirementsPlaceholder = {
    baseProfile: mockDruidCreatureProfile,
    key: 'mocked-druid-profile',
};

describe('MoonkinForm', () => {
    it('should be defined', () => {
        expect(MoonkinForm).toBeDefined();
    });

    const moonkinForm = new MoonkinForm({ rank: 1 });
    it('should be an instance of MoonkinForm', () => {
        expect(moonkinForm).toBeInstanceOf(MoonkinForm);
    });
    it('should include relevant modifiers', () => {
        const moonkin2 = moonkinForm.compute(mockedDruid, 2);
        expect(moonkin2).toBeDefined();
        // 10 base, +6 at rank 2:
        expect(moonkin2.baseStats?.charisma).toBe(16);
        expect(moonkin2.casterLevels?.spontaneous).toBe(3);
    });
});
