import { FeatChoice, CombatFeatChoice, MagicFeatChoice } from '../FeatChoice';
import { feats } from 'Character/Feats';
import { Choice } from '../Choice';

const mockedFeats = {
    simple: feats.diehard,
    martial: feats.combatReflexes,
    magic: feats.spellFocusConjuration,
};

function expectRejections(choice: Choice, ...values: any[]): void {
    for (const value of values) {
        expect(choice.validate(value)).toBe(false);
    }
}
describe('FeatChoice', () => {
    let choice: FeatChoice;
    beforeEach(() => {
        choice = new FeatChoice({
            label: 'Feat',
            validFeats: [mockedFeats.simple],
        });
    });
    it('should create a new FeatChoice', () => {
        expect(choice).toBeInstanceOf(FeatChoice);
    });
    it('should validate a valid feat', () => {
        expect(choice.validate(mockedFeats.simple)).toBe(true);
    });
    it('should not validate invalid feats', () => {
        expectRejections(choice, mockedFeats.martial, mockedFeats.magic);
    });
    it('should not validate non-feat values', () => {
        expectRejections(choice, 'test', 42, true, false, null, undefined);
    });
});

describe('CombatFeatChoice', () => {
    let choice: CombatFeatChoice;
    beforeEach(() => {
        choice = new CombatFeatChoice({ label: 'Combat Feat' });
    });
    it('should create a new CombatFeatChoice', () => {
        expect(choice).toBeInstanceOf(CombatFeatChoice);
    });
    it('should validate a valid combat feat', () => {
        expect(choice.validate(mockedFeats.martial)).toBe(true);
    });
    it('should not validate invalid feats', () => {
        expectRejections(choice, mockedFeats.simple, mockedFeats.magic);
    });
    it('should not validate non-feat values', () => {
        expectRejections(choice, 'test', 42, true, false, null, undefined);
    });
});

describe('MagicFeatChoice', () => {
    let choice: MagicFeatChoice;
    beforeEach(() => {
        choice = new MagicFeatChoice({ label: 'Magic Feat' });
    });
    it('should create a new MagicFeatChoice', () => {
        expect(choice).toBeInstanceOf(MagicFeatChoice);
    });
    it('should validate a valid magic feat', () => {
        expect(choice.validate(mockedFeats.magic)).toBe(true);
    });
    it('should not validate invalid feats', () => {
        expectRejections(choice, mockedFeats.simple, mockedFeats.martial);
    });
    it('should not validate non-feat values', () => {
        expectRejections(choice, 'test', 42, true, false, null, undefined);
    });
});
