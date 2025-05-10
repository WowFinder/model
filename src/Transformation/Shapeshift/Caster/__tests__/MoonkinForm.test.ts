import { MoonkinForm } from '..';
import { mockedDruidCharacter } from '../../../../__mocks__';

describe('MoonkinForm', () => {
    it('should be defined', () => {
        expect(MoonkinForm).toBeDefined();
    });

    const moonkinForm = new MoonkinForm({ rank: 1 });
    it('should be an instance of MoonkinForm', () => {
        expect(moonkinForm).toBeInstanceOf(MoonkinForm);
    });
    it('should include relevant modifiers', () => {
        const moonkin2 = moonkinForm.compute(mockedDruidCharacter, 2);
        expect(moonkin2).toBeDefined();
        // 10 base, +6 at rank 2:
        expect(moonkin2.baseStats?.charisma).toBe(16);
        expect(moonkin2.casterLevels?.spontaneous).toBe(3);
    });
});
