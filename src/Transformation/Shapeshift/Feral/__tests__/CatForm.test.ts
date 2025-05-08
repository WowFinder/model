import { CatForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';

const mockedDruid: CharacterRequirementsPlaceholder = {
    baseProfile: mockDruidCreatureProfile,
    key: 'mocked-druid-profile',
};

describe('CatForm', () => {
    it('should be defined', () => {
        expect(CatForm).toBeDefined();
    });

    const catForm = new CatForm({ rank: 1 });
    it('should be an instance of CatForm', () => {
        expect(catForm).toBeInstanceOf(CatForm);
    });
    it('should include relevant modifiers', () => {
        const cat2 = catForm.compute(mockedDruid, 2);
        expect(cat2).toBeDefined();
        // 10 base, +6 at rank 2:
        expect(cat2.baseStats.dexterity).toBe(16);
        expect(cat2.casterLevelsBonus.spontaneous).toBe(0);
    });
});
