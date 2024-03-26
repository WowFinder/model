import { BonusType } from '@wowfinder/ts-enums';
import { JsonCompatible, sum } from '@wowfinder/ts-utils';
import { ResistancesBonus } from './ResistancesBonus';
import { SensesBonus } from './SensesBonus';
import type { SimpleBonus } from './SimpleBonus';
import { SimpleBonusBuilder } from './SimpleBonus.builder';
import { SkillsBonus } from './SkillsBonus';
import { StatsBonus } from './StatsBonus';
import { VitalNeedsBonus } from './VitalNeedsBonus';
import { SpellPowerBonus } from './SpellPowerBonus';

function sumBonus(type: BonusType, ...args: SimpleBonus[]): SimpleBonusBuilder {
    return {
        type,
        hp: sum(...args.map(s => s.hp)),
        armorClass: sum(...args.map(s => s.armorClass)),
        stats: StatsBonus.sum(...args.map(s => s.stats)),
        skills: SkillsBonus.sum(...args.map(s => s.skills)).raw,
        resistances: ResistancesBonus.sum(...args.map(s => s.resistances)).raw,
        vitalNeeds: VitalNeedsBonus.sum(...args.map(s => s.vitalNeeds)),
        senses: SensesBonus.sum(...args.map(s => s.senses)),
        spellPower: SpellPowerBonus.sum(
            ...args.map(s => s.spellPower),
        ).export(),
    };
}

function maxBonus(type: BonusType, ...args: SimpleBonus[]): SimpleBonusBuilder {
    return {
        type,
        hp: Math.max(...args.map(s => s.hp)),
        armorClass: Math.max(...args.map(s => s.armorClass)),
        stats: StatsBonus.max(...args.map(s => s.stats)),
        skills: SkillsBonus.max(...args.map(s => s.skills)).raw,
        resistances: ResistancesBonus.max(...args.map(s => s.resistances)).raw,
        vitalNeeds: VitalNeedsBonus.max(...args.map(s => s.vitalNeeds)),
        senses: SensesBonus.max(...args.map(s => s.senses)),
        spellPower: SpellPowerBonus.max(
            ...args.map(s => s.spellPower),
        ).export(),
    };
}

function multiplyBonus(bonus: SimpleBonus, factor: number): SimpleBonusBuilder {
    return {
        type: bonus.type,
        hp: bonus.hp * factor,
        armorClass: bonus.armorClass * factor,
        stats: StatsBonus.multiply(bonus.stats, factor),
        skills: SkillsBonus.multiply(bonus.skills, factor).raw,
        resistances: ResistancesBonus.multiply(bonus.resistances, factor).raw,
        vitalNeeds: VitalNeedsBonus.multiply(bonus.vitalNeeds, factor),
        senses: SensesBonus.multiply(bonus.senses, factor),
        spellPower: SpellPowerBonus.multiply(bonus.spellPower, factor).export(),
    };
}

function exportBonus(bonus: SimpleBonus): JsonCompatible<SimpleBonusBuilder> {
    return {
        type: bonus.type,
        hp: bonus.hp,
        armorClass: bonus.armorClass,
        stats: bonus.stats,
        skills: bonus.skills.raw,
        resistances: bonus.resistances.raw,
        vitalNeeds: bonus.vitalNeeds,
        senses: bonus.senses,
        spellPower: bonus.spellPower.export(),
    };
}

export { exportBonus, maxBonus, multiplyBonus, sumBonus };
