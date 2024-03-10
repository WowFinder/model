import { Stat } from '@wowfinder/ts-enums';
import { statMod } from '../../Character/Stats';
import {
    computeModifier,
    DamageModifier,
    SpecialDamageModifier,
} from '../DamageModifier';
import {
    stats,
    rollArgsSimple,
    rollArgsFinesseSpell,
    rollArgsBadFinnese,
    statsBadFinnesse,
} from './utils';

describe('computeModifier', () => {
    describe('should compute modifier for each stat', () => {
        Object.values(Stat).forEach(stat => {
            it(`should compute modifier for ${stat}`, () => {
                const result = computeModifier(stat, rollArgsSimple);
                expect(result).toBe(statMod(stats[stat]));
            });
        });
    });

    it('should compute modifier for SpellPower', () => {
        const result = computeModifier(
            SpecialDamageModifier.SpellPower,
            rollArgsFinesseSpell,
        );
        expect(result).toBe(rollArgsFinesseSpell.spellPower);
    });

    it('should compute modifier for Finesse', () => {
        const result = computeModifier(
            SpecialDamageModifier.Finesse,
            rollArgsFinesseSpell,
        );
        expect(result).toBe(statMod(stats.dexterity));
    });
    it('should use strength when better than dexterity even with Weapon Finesse', () => {
        const result2 = computeModifier(
            SpecialDamageModifier.Finesse,
            rollArgsBadFinnese,
        );
        expect(result2).toBe(statMod(statsBadFinnesse.strength));
    });
    it('should use strength when the Weapon Finesse feat is not present', () => {
        const result = computeModifier(
            SpecialDamageModifier.Finesse,
            rollArgsSimple,
        );
        expect(result).toBe(statMod(stats.strength));
    });

    it('should compute modifier with multiplier', () => {
        const modifier: DamageModifier = SpecialDamageModifier.Finesse;
        const multiplier = 2;
        const result = computeModifier(
            modifier,
            rollArgsFinesseSpell,
            multiplier,
        );
        expect(result).toBe(statMod(stats.dexterity) * multiplier);
    });
});
