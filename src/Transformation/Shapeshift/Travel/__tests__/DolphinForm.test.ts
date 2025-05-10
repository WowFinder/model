import { DolphinForm } from '..';
import { mockedDruidCharacter } from '../../../../__mocks__';

describe('DolphinForm', () => {
    it('should be defined', () => {
        expect(DolphinForm).toBeDefined();
    });

    const dolphin = new DolphinForm({ rank: 1 });
    it('should be an instance of DolphinForm', () => {
        expect(dolphin).toBeInstanceOf(DolphinForm);
    });
    it('should include relevant modifiers', () => {
        const dolphin2 = dolphin.compute(mockedDruidCharacter, 2);
        expect(dolphin2).toBeDefined();
        expect(dolphin2.speeds?.base).toBe(0);
        expect(dolphin2.speeds?.swim).toBeCloseTo(45);
    });
});
