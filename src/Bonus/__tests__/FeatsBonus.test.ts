import { FeatsBonus } from '../FeatsBonus';
import {
    defaultFeatsBonusBuilder,
    mixedMartialFeatsBonusBuilder,
    mixedCasterFeatsBonusBuilder,
} from '../../__mocks__/';
import { Feat } from '../../Creature/Feats';

describe('FeatsBonus', () => {
    let defaultFeatsBonus: FeatsBonus;
    let martialFeatsBonus: FeatsBonus;
    let casterFeatsBonus: FeatsBonus;

    beforeEach(() => {
        defaultFeatsBonus = new FeatsBonus(defaultFeatsBonusBuilder);
        martialFeatsBonus = new FeatsBonus(mixedMartialFeatsBonusBuilder);
        casterFeatsBonus = new FeatsBonus(mixedCasterFeatsBonusBuilder);
    });

    it('should construct a default feats bonus', () => {
        expect(defaultFeatsBonus.isZero).toBe(true);
    });

    it('should construct a bonus with some martial feats', () => {
        expect(martialFeatsBonus.isZero).toBe(false);
        expect(martialFeatsBonus.get(Feat.powerAttack)).toBe(1);
        expect(martialFeatsBonus.get(Feat.cleave)).toBe(1);
    });

    it('should construct a bonus with some caster feats', () => {
        expect(casterFeatsBonus.isZero).toBe(false);
        expect(casterFeatsBonus.get(Feat.combatCasting)).toBe(1);
        expect(casterFeatsBonus.get(Feat.arcaneArmorTraining)).toBe(1);
        expect(casterFeatsBonus.get(Feat.spellFocusEvocation)).toBe(1);
        expect(casterFeatsBonus.get(Feat.greaterSpellFocusEvocation)).toBe(1);
    });

    it('should return a zero bonus', () => {
        expect(FeatsBonus.zero.isZero).toBe(true);
    });

    it('should combine bonuses', () => {
        const maxBonus = FeatsBonus.max(
            defaultFeatsBonus,
            martialFeatsBonus,
            casterFeatsBonus,
        );
        expect(maxBonus.get(Feat.powerAttack)).toBe(1);
        expect(maxBonus.get(Feat.cleave)).toBe(1);
        expect(maxBonus.get(Feat.combatCasting)).toBe(1);
        expect(maxBonus.get(Feat.arcaneArmorTraining)).toBe(1);
        expect(maxBonus.get(Feat.spellFocusEvocation)).toBe(1);
        expect(maxBonus.get(Feat.greaterSpellFocusEvocation)).toBe(1);
        expect(maxBonus.get(Feat.dodge)).toBe(0);
    });
});
