import { statMod } from '../../Character/Stats';
import type { DamageComponentSpecBuilder } from '../DamageComponent';
import { Stats } from '@wowfinder/asset-schemas';

const minRoll = (spec: DamageComponentSpecBuilder, stats: Stats): number =>
    spec.diceCount +
    (spec.fixedMod ?? 0) +
    (spec.modStat ? statMod(stats[spec.modStat]) : 0);
const maxRoll = (spec: DamageComponentSpecBuilder, stats: Stats): number =>
    spec.diceCount * spec.diceSides +
    (spec.fixedMod ?? 0) +
    (spec.modStat ? statMod(stats[spec.modStat]) : 0);

export { minRoll, maxRoll };
