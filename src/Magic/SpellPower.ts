import {
    EffectiveCasterLevels,
    zeroCasterLevel,
} from './EffectiveCasterLevels';
import type { Expanded } from '@wowfinder/ts-utils';
import { StatsBlock, zeroDefault } from '../Creature/Stats';
import {
    CastingModeValues,
    CastingModeValuesPartial,
    castingStats,
    fillCastingModeValues,
} from './CastingMode';

import {
    allSubSchoolsByParent,
    fillSchoolValues,
    fillSubSchoolValues,
    SchoolValues,
    SchoolValuesPartial,
    SubSchoolValues,
    SubSchoolValuesPartial,
} from './School';
import { CastingMode, School, SubSchool } from '@wowfinder/ts-enums';
import { RawStats } from '@wowfinder/asset-schemas';

type SpellPowerKeys = CastingMode | School | SubSchool;

type SpellPowerValues<T> = CastingModeValues<T> &
    SchoolValues<T> &
    SubSchoolValues<T>;
type SpellPowerValuesPartial<T> = CastingModeValuesPartial<T> &
    SchoolValuesPartial<T> &
    SubSchoolValuesPartial<T>;

type ComputedSubSchools = Expanded<SubSchoolValuesPartial<number>, number>;
type FullComputedSchools = Expanded<
    SchoolValues<ComputedSubSchools>,
    ComputedSubSchools
>;
type FullComputedSpellPower = CastingModeValues<FullComputedSchools>;
type PartialComputedSchools = SchoolValuesPartial<ComputedSubSchools>;
type PartialComputedSpellPower =
    CastingModeValuesPartial<PartialComputedSchools>;

function fillSpellPowerValues<T>(
    values: SpellPowerValuesPartial<T>,
    defaultValue: T,
): SpellPowerValues<T> {
    return {
        ...fillCastingModeValues<T>(values, defaultValue),
        ...fillSchoolValues<T>(values, defaultValue),
        ...fillSubSchoolValues<T>(values, defaultValue),
    };
}

function computedSpellPower(
    data: SpellPowerValues<number>,
    mode: CastingMode,
    school: School | SubSchool,
    stats?: RawStats,
    efl: EffectiveCasterLevels = zeroCasterLevel,
): number {
    const smods = new StatsBlock({ base: stats ?? zeroDefault });
    const smod = smods.totalMods[castingStats[mode]];
    return data[mode] + data[school] + smod + (efl[mode] ?? 0);
}

function fullComputedSpellPower(
    data: SpellPowerValues<number>,
    stats?: RawStats,
    efl: EffectiveCasterLevels = zeroCasterLevel,
): FullComputedSpellPower {
    const res: PartialComputedSpellPower = {};
    for (const mode of Object.keys(CastingMode)) {
        const m = mode as CastingMode;
        res[m] = {};
        for (const school of Object.keys(School)) {
            const s = school as School;
            res[m]![s] = {
                '': computedSpellPower(data, m, s, stats, efl),
            };
            for (const ss of allSubSchoolsByParent[s]) {
                res[m]![s]![ss] = computedSpellPower(data, m, ss, stats, efl);
            }
        }
    }
    return res as FullComputedSpellPower;
}

const zeroSpellPower = fullComputedSpellPower(fillSpellPowerValues({}, 0));

export type {
    SpellPowerKeys,
    /** @deprecated: use explicit mapped types instead */
    SpellPowerValues,
    /** @deprecated: use explicit mapped types instead */
    SpellPowerValuesPartial,
    FullComputedSpellPower,
    FullComputedSchools,
    ComputedSubSchools,
};
export {
    fillSpellPowerValues,
    computedSpellPower,
    fullComputedSpellPower,
    zeroSpellPower,
};
