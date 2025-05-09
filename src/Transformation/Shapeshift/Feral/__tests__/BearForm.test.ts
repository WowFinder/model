import { BearForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';

const mockedDruid: CharacterRequirementsPlaceholder = {
    baseProfile: mockDruidCreatureProfile,
    key: 'mocked-druid-profile',
};

describe('BearForm', () => {
    it('should be defined', () => {
        expect(BearForm).toBeDefined();
    });

    const bearForm = new BearForm({ rank: 1 });
    it('should be an instance of BearForm', () => {
        expect(bearForm).toBeInstanceOf(BearForm);
    });
    it('should include relevant modifiers', () => {
        const bear2 = bearForm.compute(mockedDruid, 2);
        expect(bear2).toBeDefined();
        // 10 base, +6 at rank 2:
        expect(bear2.baseStats?.constitution).toBe(16);
    });
});
