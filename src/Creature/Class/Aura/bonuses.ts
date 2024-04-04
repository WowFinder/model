import { Aura, BonusType } from '@wowfinder/ts-enums';
import { Bonus, ResistBonus, StatsBonus } from 'Character/Bonus';
import { fillResistBonus } from 'Character/Bonus/ResistBonus';
import { AuraBonus } from './base';

const auraBonuses: { [key in Aura]: AuraBonus } = {
    [Aura.commanding]: (rank: number) =>
        new Bonus({
            // Commanding Shout (fgt)
            type: BonusType.aura,
            stats: new StatsBonus({
                constitution: rank * 6,
            }),
            resistances: new ResistBonus(fillResistBonus({}, rank * 2)),
        }),
    [Aura.furious]: (rank: number) =>
        new Bonus({
            // Furious Howl (brb)
            type: BonusType.aura,
            stats: new StatsBonus({
                strength: rank * 4,
            }),
            resistances: new ResistBonus(fillResistBonus({}, rank * 4)),
        }),
    [Aura.arcane]: (rank: number) =>
        new Bonus({
            // Arcane brillance (mag)
            type: BonusType.aura,
            stats: new StatsBonus({
                intelligence: rank * 6,
                charisma: rank * 6,
            }),
        }),
    [Aura.wild]: (rank: number) =>
        new Bonus({
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
            resistances: new ResistBonus(fillResistBonus({}, rank * 1)),
        }),
    [Aura.mysterious]: (rank: number) =>
        new Bonus({
            // Misterious Fortitude (ora)
            type: BonusType.aura,
            stats: new StatsBonus({
                constitution: rank * 6,
                charisma: rank * 6,
            }),
        }),
    [Aura.fortitude]: (rank: number) =>
        new Bonus({
            // Power Word: Fortitude (clr)
            type: BonusType.aura,
            stats: new StatsBonus({
                constitution: rank * 6,
                wisdom: rank * 6,
            }),
        }),
};

export { auraBonuses };
