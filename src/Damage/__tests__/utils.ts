import { statMod } from '../../Character/Stats';
import type { StatSet } from '../../Character/Stats';
import type { DamageComponentSpecBuilder } from '../DamageComponent';
import type { FullDamageTypes } from '../DamageType';
import type { DamageRollArguments } from '../DamageRollArguments';
import { Stat } from '@wowfinder/ts-enums';

const mockDamageTypes: FullDamageTypes = {
    bludgeoning: true,
    slashing: false,
    piercing: false,
    arcane: false,
    fire: true,
    cold: false,
    nature: false,
    shadow: false,
    holy: false,
    psychic: true,
};

const damageComponentSpecBuilder: DamageComponentSpecBuilder = {
    // 2d6+3 + strength
    // Min roll (assume strength bonus is -1): 4
    // Max roll (assume strength bonus is -1): 14
    types: mockDamageTypes,
    diceCount: 2,
    diceSides: 6,
    fixedMod: 3,
    modStat: Stat.strength,
};
const stats: StatSet = {
    [Stat.strength]: 8,
    [Stat.dexterity]: 12,
    [Stat.constitution]: 14,
    [Stat.intelligence]: 10,
    [Stat.wisdom]: 13,
    [Stat.charisma]: 15,
};

const statsBadFinnesse: StatSet = {
    [Stat.strength]: 12,
    [Stat.dexterity]: 8,
    [Stat.constitution]: 14,
    [Stat.intelligence]: 10,
    [Stat.wisdom]: 13,
    [Stat.charisma]: 15,
};

const rollArgsSimple: DamageRollArguments = {
    stats,
    casterLevel: 0,
    spellPower: 0,
};

const rollArgsFinesseSpell: DamageRollArguments = {
    stats,
    casterLevel: 0,
    spellPower: 0,
    feats: ['weaponFinesse'],
};

const rollArgsBadFinnese: DamageRollArguments = {
    stats: statsBadFinnesse,
    casterLevel: 0,
    spellPower: 0,
    feats: ['weaponFinesse'],
};

const minRoll = (spec: DamageComponentSpecBuilder, stats: StatSet): number =>
    spec.diceCount +
    (spec.fixedMod ?? 0) +
    (spec.modStat ? statMod(stats[spec.modStat]) : 0);
const maxRoll = (spec: DamageComponentSpecBuilder, stats: StatSet): number =>
    spec.diceCount * spec.diceSides +
    (spec.fixedMod ?? 0) +
    (spec.modStat ? statMod(stats[spec.modStat]) : 0);

export {
    mockDamageTypes,
    damageComponentSpecBuilder,
    stats,
    statsBadFinnesse,
    rollArgsSimple,
    rollArgsFinesseSpell,
    rollArgsBadFinnese,
    minRoll,
    maxRoll,
};
