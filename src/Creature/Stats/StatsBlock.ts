import type { RawStats } from '@wowfinder/asset-schemas';
import type { Mass } from '../../Scalar';
import {
    PartialStatBlock,
    addStatSets,
    baseDefault,
    carry,
    statMod,
    zeroDefault,
} from './helpers';

class StatsBlock {
    readonly #base: RawStats;
    readonly #racial: RawStats;
    readonly #enhance: RawStats;
    readonly #gear: RawStats;
    readonly #misc: RawStats;
    readonly #temp: RawStats;

    constructor({
        base = baseDefault,
        racial = zeroDefault,
        enhance = zeroDefault,
        gear = zeroDefault,
        misc = zeroDefault,
        temp = zeroDefault,
    }: PartialStatBlock) {
        this.#base = base;
        this.#racial = racial;
        this.#enhance = enhance;
        this.#gear = gear;
        this.#misc = misc;
        this.#temp = temp;
    }

    get totals(): RawStats {
        return addStatSets(
            this.#base,
            this.#racial,
            this.#enhance,
            this.#gear,
            this.#misc,
            this.#temp,
        );
    }

    get intrinsic(): RawStats {
        return addStatSets(this.#base, this.#racial);
    }

    get base(): RawStats {
        return { ...this.#base };
    }

    get racial(): RawStats {
        return { ...this.#racial };
    }

    get enhance(): RawStats {
        return { ...this.#enhance };
    }

    get gear(): RawStats {
        return { ...this.#gear };
    }

    get misc(): RawStats {
        return { ...this.#misc };
    }

    get temp(): RawStats {
        return { ...this.#temp };
    }

    get active(): RawStats {
        return addStatSets(this.base, this.racial, this.enhance);
    }

    get totalMods(): RawStats {
        const totals = this.totals;
        return {
            strength: statMod(totals.strength),
            dexterity: statMod(totals.dexterity),
            constitution: statMod(totals.constitution),
            intelligence: statMod(totals.intelligence),
            wisdom: statMod(totals.wisdom),
            charisma: statMod(totals.charisma),
        };
    }

    /* istanbul ignore next: covered by `carry` tests on ./helpers.ts */
    get carry(): Mass {
        return carry(this.totals.strength);
    }

    updated({
        base,
        racial,
        enhance,
        gear,
        misc,
        temp,
    }: PartialStatBlock): StatsBlock {
        return new StatsBlock({
            base: base ?? this.base,
            racial: racial ?? this.racial,
            enhance: enhance ?? this.enhance,
            gear: gear ?? this.gear,
            misc: misc ?? this.misc,
            temp: temp ?? this.temp,
        });
    }
}

export { StatsBlock };
