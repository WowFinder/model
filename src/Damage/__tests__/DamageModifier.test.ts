import { Stat } from '@wowfinder/ts-enums';
import {
    badFinesseStatsMock,
    defaultStatsMock,
    goodFinesseStatsMock,
    rollArgsBadFinnese,
    rollArgsBadStrength,
    rollArgsFinesseSpell,
    rollArgsSimple,
} from '../../__mocks__';
import { statMod } from '../../Creature/Stats/helpers';
import {
    computeModifier,
    type DamageModifier,
    SpecialDamageModifier,
} from '../DamageModifier';

describe('computeModifier', () => {
    describe('should compute modifier for each stat', () => {
        Object.values(Stat).forEach(stat => {
            it(`should compute modifier for ${stat}`, () => {
                const result = computeModifier(stat, rollArgsSimple);
                expect(result).toBe(statMod(defaultStatsMock[stat]));
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
        expect(result).toBe(statMod(goodFinesseStatsMock.dexterity));
    });
    it('should use strength when better than dexterity even with Weapon Finesse', () => {
        const result2 = computeModifier(
            SpecialDamageModifier.Finesse,
            rollArgsBadFinnese,
        );
        expect(result2).toBe(statMod(badFinesseStatsMock.strength));
    });
    it('should use strength when the Weapon Finesse feat is not present', () => {
        const result = computeModifier(
            SpecialDamageModifier.Finesse,
            rollArgsBadStrength,
        );
        expect(result).toBe(statMod(goodFinesseStatsMock.strength));
    });

    it('should compute modifier with multiplier', () => {
        const modifier: DamageModifier = SpecialDamageModifier.Finesse;
        const multiplier = 2;
        const result = computeModifier(
            modifier,
            rollArgsFinesseSpell,
            multiplier,
        );
        expect(result).toBe(
            statMod(goodFinesseStatsMock.dexterity) * multiplier,
        );
    });
});
