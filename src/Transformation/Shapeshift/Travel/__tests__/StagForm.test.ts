import { StagForm } from '..';
import { mockedDruidCharacter } from '../../../../__mocks__';

describe('StagForm', () => {
    it('should be defined', () => {
        expect(StagForm).toBeDefined();
    });

    const stag = new StagForm({ rank: 1 });
    it('should be an instance of StagForm', () => {
        expect(stag).toBeInstanceOf(StagForm);
    });
    it('should include relevant modifiers', () => {
        const stag2 = stag.compute(mockedDruidCharacter, 2);
        expect(stag2).toBeDefined();
        expect(stag2.speeds?.base).toBeCloseTo(105);
    });
});
