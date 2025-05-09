import { CheetahForm } from '..';
import { mockDruidCreatureProfile } from '../../../../__mocks__';
import { type CharacterRequirementsPlaceholder } from '../../../../Old.Character/Requirements/base';

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
        expect(cheetah2.speeds?.base).toBe(60);
    });
});
