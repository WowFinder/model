import { RawStats } from '@wowfinder/asset-schemas';
import { Feat } from '../Character/Feats';

type DamageRollArguments = {
    stats: RawStats;
    casterLevel: number;
    spellPower: number;
    feats?: Feat[];
};

export type { DamageRollArguments };
