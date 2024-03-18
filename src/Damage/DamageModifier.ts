import { Stat } from '@wowfinder/ts-enums';
import { statMod } from '../Creature/Stats';
import { DamageRollArguments } from './DamageRollArguments';

enum SpecialDamageModifier {
    SpellPower = 'SpellPower',
    Finesse = 'Finesse',
}

type DamageModifier = Stat | SpecialDamageModifier;
const DamageModifier = { ...Stat, ...SpecialDamageModifier };

function computeModifier(
    modifier: DamageModifier,
    { stats, spellPower, feats = [] }: DamageRollArguments,
    multiplier = 1,
): number {
    let base: number;
    switch (modifier) {
        case SpecialDamageModifier.SpellPower:
            base = spellPower;
            break;
        case SpecialDamageModifier.Finesse:
            base = statMod(
                feats.includes('weaponFinesse')
                    ? Math.max(stats.dexterity, stats.strength)
                    : stats.strength,
            );
            break;
        default:
            base = statMod(stats[modifier]);
    }
    return base * multiplier;
}

export { DamageModifier, SpecialDamageModifier, computeModifier };
