import { type RawStats } from '@wowfinder/asset-schemas';
import { type Feat } from '../Creature/Feats';

type DamageRollArguments = {
    stats: RawStats;
    casterLevel: number;
    spellPower: number;
    feats?: Feat[];
};

export type { DamageRollArguments };
