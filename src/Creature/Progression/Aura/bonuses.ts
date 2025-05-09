import { Aura, BonusType } from '@wowfinder/ts-enums';
import { fillResistances } from '../../Resistances/fill';
import { AuraBonus } from './base';
import { ResistancesBonus, StatsBonus, TypedSimpleBonus } from '../../../Bonus';

const auraBonuses: { [key in Aura]: AuraBonus } = {
    [Aura.commanding]: (rank: number) =>
        new TypedSimpleBonus({
            // Commanding Shout (fgt)
            type: BonusType.aura,
            stats: new StatsBonus({
                constitution: rank * 6,
            }),
            resistances: new ResistancesBonus(fillResistances({}, rank * 2)),
        }),
    [Aura.furious]: (rank: number) =>
        new TypedSimpleBonus({
            // Furious Howl (brb)
            type: BonusType.aura,
            stats: new StatsBonus({
                strength: rank * 4,
            }),
            resistances: new ResistancesBonus(fillResistances({}, rank * 4)),
        }),
    [Aura.arcane]: (rank: number) =>
        new TypedSimpleBonus({
            // Arcane brillance (mag)
            type: BonusType.aura,
            stats: new StatsBonus({
                intelligence: rank * 6,
                charisma: rank * 6,
            }),
        }),
    [Aura.wild]: (rank: number) =>
        new TypedSimpleBonus({
            // Gift of the wild (drd)
            type: BonusType.aura,
            stats: new StatsBonus({
                strength: rank * 2,
                dexterity: rank * 2,
                constitution: rank * 2,
                intelligence: rank * 2,
                wisdom: rank * 2,
                charisma: rank * 2,
            }),
            resistances: new ResistancesBonus(fillResistances({}, rank * 1)),
        }),
    [Aura.mysterious]: (rank: number) =>
        new TypedSimpleBonus({
            // Misterious Fortitude (ora)
            type: BonusType.aura,
            stats: new StatsBonus({
                constitution: rank * 6,
                charisma: rank * 6,
            }),
        }),
    [Aura.fortitude]: (rank: number) =>
        new TypedSimpleBonus({
            // Power Word: Fortitude (clr)
            type: BonusType.aura,
            stats: new StatsBonus({
                constitution: rank * 6,
                wisdom: rank * 6,
            }),
        }),
};

export { auraBonuses };
