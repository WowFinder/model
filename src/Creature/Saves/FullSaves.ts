import type { RawSaves } from '@wowfinder/asset-schemas';
import { StatsBlock } from '../Stats/StatsBlock';
import { SaveBreakdowns, SaveBreakdown } from './SaveBreakdown';
import { fillSaves } from './helpers';

type FullSavesBuilder = {
    stats: StatsBlock;
    base?: Partial<RawSaves>;
    enhancement?: Partial<RawSaves>;
    gear?: Partial<RawSaves>;
    misc?: Partial<RawSaves>;
    temporary?: Partial<RawSaves>;
};

class FullSaves implements SaveBreakdowns {
    readonly #stats: StatsBlock;
    readonly #base: RawSaves;
    readonly #enhancement: RawSaves;
    readonly #gear: RawSaves;
    readonly #misc: RawSaves;
    readonly #temporary: RawSaves;
    constructor({
        stats,
        base,
        enhancement,
        gear,
        misc,
        temporary,
    }: FullSavesBuilder) {
        this.#stats = new StatsBlock(stats);
        this.#base = fillSaves(base);
        this.#enhancement = fillSaves(enhancement);
        this.#gear = fillSaves(gear);
        this.#misc = fillSaves(misc);
        this.#temporary = fillSaves(temporary);
    }

    get base(): RawSaves {
        return { ...this.#base };
    }

    get enhancement(): RawSaves {
        return { ...this.#enhancement };
    }

    get gear(): RawSaves {
        return { ...this.#gear };
    }

    get misc(): RawSaves {
        return { ...this.#misc };
    }

    get temporary(): RawSaves {
        return { ...this.#temporary };
    }

    get fortitude(): SaveBreakdown {
        return new SaveBreakdown({
            base: this.#base.fortitude,
            stat: this.#stats.totalMods.constitution,
            enhancement: this.#enhancement.fortitude,
            gear: this.#gear.fortitude,
            misc: this.#misc.fortitude,
            temporary: this.#temporary.fortitude,
        });
    }

    get reflexes(): SaveBreakdown {
        return new SaveBreakdown({
            base: this.#base.reflexes,
            stat: this.#stats.totalMods.dexterity,
            enhancement: this.#enhancement.reflexes,
            gear: this.#gear.reflexes,
            misc: this.#misc.reflexes,
            temporary: this.#temporary.reflexes,
        });
    }

    get will(): SaveBreakdown {
        return new SaveBreakdown({
            base: this.#base.will,
            stat: this.#stats.totalMods.wisdom,
            enhancement: this.#enhancement.will,
            gear: this.#gear.will,
            misc: this.#misc.will,
            temporary: this.#temporary.will,
        });
    }
}

export type { FullSavesBuilder };
export { FullSaves };
