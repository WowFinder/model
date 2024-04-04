import { statMod } from 'Creature/Stats/helpers';
import type { DamageComponentSpecBuilder } from '../DamageComponent';
import type { RawStats } from '@wowfinder/asset-schemas';

const minRoll = (spec: DamageComponentSpecBuilder, stats: RawStats): number =>
    spec.diceCount +
    (spec.fixedMod ?? 0) +
    (spec.modStat ? statMod(stats[spec.modStat]) : 0);
const maxRoll = (spec: DamageComponentSpecBuilder, stats: RawStats): number =>
    spec.diceCount * spec.diceSides +
    (spec.fixedMod ?? 0) +
    (spec.modStat ? statMod(stats[spec.modStat]) : 0);

export { minRoll, maxRoll };
