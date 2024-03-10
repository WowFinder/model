import { Save } from '@wowfinder/ts-enums';
import { Stats } from './Stats';

interface SaveBreakdownBuilder {
    base: number;
    stat: number;
    enhance: number;
    gear: number;
    misc: number;
    temp: number;
}

class SaveBreakdown {
    #base: number;
    #stat: number;
    #enhance: number;
    #gear: number;
    #misc: number;
    #temp: number;
    constructor({
        base,
        stat,
        enhance,
        gear,
        misc,
        temp,
    }: SaveBreakdownBuilder) {
        this.#base = base;
        this.#stat = stat;
        this.#enhance = enhance;
        this.#gear = gear;
        this.#misc = misc;
        this.#temp = temp;
    }

    get total(): number {
        return (
            this.#stat +
            this.#base +
            this.#enhance +
            this.#gear +
            this.#misc +
            this.#temp
        );
    }

    get base(): number {
        return this.#base;
    }

    get stat(): number {
        return this.#stat;
    }

    get enhance(): number {
        return this.#enhance;
    }

    get gear(): number {
        return this.#gear;
    }

    get misc(): number {
        return this.#misc;
    }

    get temp(): number {
        return this.#temp;
    }
}

type SimpleSavesBuilder = Partial<Record<Save, number>>;

class SimpleSaves {
    #fortitude: number;
    #reflexes: number;
    #will: number;

    constructor({ fortitude = 0, reflexes = 0, will = 0 }: SimpleSavesBuilder) {
        this.#fortitude = fortitude;
        this.#reflexes = reflexes;
        this.#will = will;
    }

    get fortitude(): number {
        return this.#fortitude;
    }

    get reflexes(): number {
        return this.#reflexes;
    }

    get will(): number {
        return this.#will;
    }

    get indexed(): Record<Save, number> {
        return {
            fortitude: this.#fortitude,
            reflexes: this.#reflexes,
            will: this.#will,
        };
    }

    get isZero(): boolean {
        return (
            this.#fortitude === 0 && this.#reflexes === 0 && this.#will === 0
        );
    }

    copy(): SimpleSaves {
        return new SimpleSaves({
            fortitude: this.#fortitude,
            reflexes: this.#reflexes,
            will: this.#will,
        });
    }

    static get zero(): SimpleSaves {
        return new SimpleSaves({
            fortitude: 0,
            reflexes: 0,
            will: 0,
        });
    }
}

interface SavesBuilder {
    stats: Stats;
    base?: SimpleSaves;
    enhance?: SimpleSaves;
    gear?: SimpleSaves;
    misc?: SimpleSaves;
    temp?: SimpleSaves;
}

class Saves {
    #stats: Stats;
    #base: SimpleSaves;
    #enhancement: SimpleSaves;
    #gear: SimpleSaves;
    #misc: SimpleSaves;
    #temporal: SimpleSaves;
    constructor({
        stats,
        base = SimpleSaves.zero,
        enhance = SimpleSaves.zero,
        gear = SimpleSaves.zero,
        misc = SimpleSaves.zero,
        temp = SimpleSaves.zero,
    }: SavesBuilder) {
        this.#stats = new Stats(stats);
        this.#base = new SimpleSaves(base);
        this.#enhancement = new SimpleSaves(enhance);
        this.#gear = new SimpleSaves(gear);
        this.#misc = new SimpleSaves(misc);
        this.#temporal = new SimpleSaves(temp);
    }

    get base(): SimpleSaves {
        return this.#base.copy();
    }

    get enhance(): SimpleSaves {
        return this.#enhancement.copy();
    }

    get gear(): SimpleSaves {
        return this.#gear.copy();
    }

    get misc(): SimpleSaves {
        return this.#misc.copy();
    }

    get temp(): SimpleSaves {
        return this.#temporal.copy();
    }

    get fort(): SaveBreakdown {
        return new SaveBreakdown({
            base: this.#base.fortitude,
            stat: this.#stats.totalMods.constitution,
            enhance: this.#enhancement.fortitude,
            gear: this.#gear.fortitude,
            misc: this.#misc.fortitude,
            temp: this.#temporal.fortitude,
        });
    }

    get refl(): SaveBreakdown {
        return new SaveBreakdown({
            base: this.#base.reflexes,
            stat: this.#stats.totalMods.dexterity,
            enhance: this.#enhancement.reflexes,
            gear: this.#gear.reflexes,
            misc: this.#misc.reflexes,
            temp: this.#temporal.reflexes,
        });
    }

    get will(): SaveBreakdown {
        return new SaveBreakdown({
            base: this.#base.will,
            stat: this.#stats.totalMods.wisdom,
            enhance: this.#enhancement.will,
            gear: this.#gear.will,
            misc: this.#misc.will,
            temp: this.#temporal.will,
        });
    }
}

export type { SimpleSavesBuilder };

export { Saves, SimpleSaves, SaveBreakdown };
