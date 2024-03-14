import { Stats } from '@wowfinder/asset-schemas';
import { Mass } from '../../Scalar';
import {
    baseDefault,
    zeroDefault,
    PartialStatBlock,
    addStatSets,
    carry,
} from './helpers';

class StatsBlockBase {
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

    get carry(): Mass {
        return carry(this.totals.strength);
    }
}

export { StatsBlockBase };
