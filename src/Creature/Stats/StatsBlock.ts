import { Mass } from '../../Scalar';
import { Stats as StatValues, Stats } from '@wowfinder/asset-schemas';
import {
    PartialStatBlock,
    addStatSets,
    statMod,
    carry,
    baseDefault,
    zeroDefault,
} from './helpers';

class StatsBlock {
    #base: Stats;
    #racial: Stats;
    #enhance: Stats;
    #gear: Stats;
    #misc: Stats;
    #temp: Stats;

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

    get totals(): Stats {
        return addStatSets(
            this.#base,
            this.#racial,
            this.#enhance,
            this.#gear,
            this.#misc,
            this.#temp,
        );
    }

    get intrinsic(): Stats {
        return addStatSets(this.#base, this.#racial);
    }

    get base(): Stats {
        return { ...this.#base };
    }

    get racial(): Stats {
        return { ...this.#racial };
    }

    get enhance(): Stats {
        return { ...this.#enhance };
    }

    get gear(): Stats {
        return { ...this.#gear };
    }

    get misc(): Stats {
        return { ...this.#misc };
    }

    get temp(): Stats {
        return { ...this.#temp };
    }

    get active(): StatValues {
        return addStatSets(this.base, this.racial, this.enhance);
    }

    get totalMods(): StatValues {
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
