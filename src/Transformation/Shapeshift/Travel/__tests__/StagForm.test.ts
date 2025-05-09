import { StagForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';

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
        expect(stag2.speeds?.base).toBeCloseTo(105);
    });
});
