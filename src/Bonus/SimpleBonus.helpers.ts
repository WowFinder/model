import { JsonCompatible, sum } from '@wowfinder/ts-utils';
import { ResistancesBonus } from './ResistancesBonus';
import { SensesBonus } from './SensesBonus';
import type { SimpleBonus } from './SimpleBonus';
import { SimpleBonusBuilder } from './SimpleBonus.builder';
import { SkillsBonus } from './SkillsBonus';
import { StatsBonus } from './StatsBonus';
import { VitalsBonus } from './VitalsBonus';
import { SpellPowerBonus } from './SpellPowerBonus';
import { FeatsBonus } from './FeatsBonus';
import { BaseSpeedsBonus, SpeedsModifiersBonus } from './SpeedsBonus';
import { SavesBonus } from './SavesBonus';

function sumBonus(...args: SimpleBonus[]): SimpleBonusBuilder {
    return {
        hp: sum(...args.map(s => s.hp)),
        armorClass: sum(...args.map(s => s.armorClass)),
        stats: StatsBonus.sum(...args.map(s => s.stats)),
        skills: SkillsBonus.sum(...args.map(s => s.skills)),
        saves: SavesBonus.sum(...args.map(s => s.saves)),
        resistances: ResistancesBonus.sum(...args.map(s => s.resistances)),
        vitals: VitalsBonus.sum(...args.map(s => s.vitals)).export(),
        senses: SensesBonus.max(...args.map(s => s.senses)),
        spellPower: SpellPowerBonus.sum(
            ...args.map(s => s.spellPower),
        ).export(),
        // https://github.com/WowFinder/model/issues/219: support multiples of the same feat in bonuses
        feats: FeatsBonus.max(...args.map(s => s.feats)).export(),
        baseSpeeds: BaseSpeedsBonus.max(
            ...args.map(s => s.baseSpeeds),
        ).export(),
        speedsModifiers: SpeedsModifiersBonus.sum(
            ...args.map(s => s.speedsModifiers),
        ).export(),
    };
}

function maxBonus(...args: SimpleBonus[]): SimpleBonusBuilder {
    return {
        hp: Math.max(...args.map(s => s.hp)),
        armorClass: Math.max(...args.map(s => s.armorClass)),
        stats: StatsBonus.max(...args.map(s => s.stats)).export(),
        skills: SkillsBonus.max(...args.map(s => s.skills)).export(),
        saves: SavesBonus.max(...args.map(s => s.saves)).export(),
        resistances: ResistancesBonus.max(
            ...args.map(s => s.resistances),
        ).export(),
        vitals: VitalsBonus.max(...args.map(s => s.vitals)).export(),
        senses: SensesBonus.max(...args.map(s => s.senses)).export(),
        spellPower: SpellPowerBonus.max(
            ...args.map(s => s.spellPower),
        ).export(),
        feats: FeatsBonus.max(...args.map(s => s.feats)).export(),
        baseSpeeds: BaseSpeedsBonus.max(
            ...args.map(s => s.baseSpeeds),
        ).export(),
        speedsModifiers: SpeedsModifiersBonus.max(
            ...args.map(s => s.speedsModifiers),
        ).export(),
    };
}

function multiplyBonus(bonus: SimpleBonus, factor: number): SimpleBonusBuilder {
    return {
        hp: bonus.hp * factor,
        armorClass: bonus.armorClass * factor,
        stats: StatsBonus.multiply(bonus.stats, factor),
        skills: SkillsBonus.multiply(bonus.skills, factor),
        resistances: ResistancesBonus.multiply(bonus.resistances, factor),
        vitals: VitalsBonus.multiply(bonus.vitals, factor).export(),
        senses: bonus.senses,
        spellPower: SpellPowerBonus.multiply(bonus.spellPower, factor).export(),
        feats: bonus.feats.export(),
        baseSpeeds: bonus.baseSpeeds.export(),
        speedsModifiers: SpeedsModifiersBonus.multiply(
            bonus.speedsModifiers,
            factor,
        ).export(),
    };
}

function exportBonus(bonus: SimpleBonus): JsonCompatible<SimpleBonusBuilder> {
    return {
        hp: bonus.hp,
        armorClass: bonus.armorClass,
        stats: bonus.stats.export(),
        skills: bonus.skills.export(),
        saves: bonus.saves.export(),
        resistances: bonus.resistances.export(),
        vitals: bonus.vitals.export(),
        senses: bonus.senses.export(),
        spellPower: bonus.spellPower.export(),
        feats: bonus.feats.export(),
        baseSpeeds: bonus.baseSpeeds.export(),
        speedsModifiers: bonus.speedsModifiers.export(),
    };
}

export { exportBonus, maxBonus, multiplyBonus, sumBonus };
