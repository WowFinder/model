import { CheetahForm } from '..';
import { mockedDruidCharacter } from '../../../../__mocks__';

describe('CheetahForm', () => {
    it('should be defined', () => {
        expect(CheetahForm).toBeDefined();
    });

    const cheetah = new CheetahForm({ rank: 1 });
    it('should be an instance of CheetahForm', () => {
        expect(cheetah).toBeInstanceOf(CheetahForm);
    });
    it('should include relevant modifiers', () => {
        const cheetah2 = cheetah.compute(mockedDruidCharacter, 2);
        expect(cheetah2).toBeDefined();
        expect(cheetah2.speeds?.base).toBe(60);
    });
});
