import { RawStats } from '@wowfinder/asset-schemas';
import { Feat } from '../Creature/Feats';

type DamageRollArguments = {
    stats: RawStats;
    casterLevel: number;
    spellPower: number;
    feats?: Feat[];
};

export type { DamageRollArguments };
