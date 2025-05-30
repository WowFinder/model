import { type RawStats } from '@wowfinder/asset-schemas';
import { type EffectiveCasterLevels } from '../Magic';
import { type SpeedBuilder } from '../Creature';

// TODO Deprecate and include full implementation under `Character/`
type CharacterOverridePlaceholder = {
    key: string;
    baseStats?: RawStats;
    casterLevels?: Partial<EffectiveCasterLevels>;
    size?: number;
    naturalArmor?: number;
    speeds?: SpeedBuilder;
};

export { type CharacterOverridePlaceholder };
