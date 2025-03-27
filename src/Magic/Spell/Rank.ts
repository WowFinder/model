import { RawSpellRank } from '@wowfinder/asset-schemas';
import { SpellBase, SpellBaseBuilder } from './base';

interface SpellRankBuilder extends SpellBaseBuilder {
    rank?: number;
}

class SpellRank extends SpellBase implements SpellRankBuilder {
    readonly #rank: number;

    constructor({ rank, ...rest }: RawSpellRank) {
        super(rest);
        this.#rank = rank ?? 0;
    }

    get rank(): number {
        return this.#rank;
    }
}

export type { SpellRankBuilder };
export { SpellRank };
