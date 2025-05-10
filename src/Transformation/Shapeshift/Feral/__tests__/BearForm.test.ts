import { BearForm } from '..';
import { mockedDruidCharacter } from '../../../../__mocks__';

describe('BearForm', () => {
    it('should be defined', () => {
        expect(BearForm).toBeDefined();
    });

    const bearForm = new BearForm({ rank: 1 });
    it('should be an instance of BearForm', () => {
        expect(bearForm).toBeInstanceOf(BearForm);
    });
    it('should include relevant modifiers', () => {
        const bear2 = bearForm.compute(mockedDruidCharacter, 2);
        expect(bear2).toBeDefined();
        // 10 base, +6 at rank 2:
        expect(bear2.baseStats?.constitution).toBe(16);
    });
});
