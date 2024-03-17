import { Stats } from '@wowfinder/asset-schemas';
import { Feat } from '../Character/Feats';

interface DamageRollArguments {
    stats: Stats;
    casterLevel: number;
    spellPower: number;
    feats?: Feat[];
}

export { DamageRollArguments };
