import { mockedBruteCharacter, mockedDruidCharacter } from '../../__mocks__';
import { type CharacterBaseInterface } from '../../Character';
import { type Feat } from '../../Creature/Feats';
import { CharacterFeatRequirement, FeatRequirement } from '../FeatRequirement';

function getFeats(char: CharacterBaseInterface): Feat[] {
    return Object.keys(char.baseProfile.feats) as Feat[];
}

describe('FeatRequirement classes', () => {
    describe('FeatRequirement', () => {
        let conjurationFeatReq: FeatRequirement;
        beforeEach(() => {
            conjurationFeatReq = new FeatRequirement('spellFocusConjuration');
        });
        it('should return true if the feat is present', () => {
            expect(
                conjurationFeatReq.test(getFeats(mockedDruidCharacter)),
            ).toBe(true);
        });
        it('should return false if the feat is not present', () => {
            expect(
                conjurationFeatReq.test(getFeats(mockedBruteCharacter)),
            ).toBe(false);
        });
    });
    describe('CharacterFeatRequirement', () => {
        let conjurationFeatReq: CharacterFeatRequirement;
        beforeEach(() => {
            conjurationFeatReq = new CharacterFeatRequirement(
                'spellFocusConjuration',
            );
        });
        it('should return true if the feat is present', () => {
            expect(conjurationFeatReq.test(mockedDruidCharacter)).toBe(true);
        });
        it('should return false if the feat is not present', () => {
            expect(conjurationFeatReq.test(mockedBruteCharacter)).toBe(false);
        });
        it('should return false if the feat is required more times than available', () => {
            conjurationFeatReq = new CharacterFeatRequirement(
                'spellFocusConjuration',
                2,
            );
            expect(conjurationFeatReq.test(mockedDruidCharacter)).toBe(false);
        });
    });
});
