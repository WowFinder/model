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

interface SimpleSavesBuilder {
    fort?: number;
    refl?: number;
    will?: number;
}

class SimpleSaves {
    protected _fort: number;
    protected _refl: number;
    protected _will: number;

    constructor({ fort = 0, refl = 0, will = 0 }: SimpleSavesBuilder) {
        this._fort = fort;
        this._refl = refl;
        this._will = will;
    }

    get fort(): number {
        return this._fort;
    }

    get refl(): number {
        return this._refl;
    }

    get will(): number {
        return this._will;
    }

    get indexed(): Record<Save, number> {
        return {
            fort: this._fort,
            refl: this._refl,
            will: this._will,
        };
    }

    get isZero(): boolean {
        return this._fort === 0 && this._refl === 0 && this._will === 0;
    }

    copy(): SimpleSaves {
        return new SimpleSaves({
            fort: this._fort,
            refl: this._refl,
            will: this._will,
        });
    }

    static get zero(): SimpleSaves {
        return new SimpleSaves({
            fort: 0,
            refl: 0,
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
    private _stats: Stats;
    private _base: SimpleSaves;
    private _ehn: SimpleSaves;
    private _gear: SimpleSaves;
    private _misc: SimpleSaves;
    private _temp: SimpleSaves;
    constructor({
        stats,
        base = SimpleSaves.zero,
        enhance = SimpleSaves.zero,
        gear = SimpleSaves.zero,
        misc = SimpleSaves.zero,
        temp = SimpleSaves.zero,
    }: SavesBuilder) {
        this._stats = new Stats(stats);
        this._base = new SimpleSaves(base);
        this._ehn = new SimpleSaves(enhance);
        this._gear = new SimpleSaves(gear);
        this._misc = new SimpleSaves(misc);
        this._temp = new SimpleSaves(temp);
    }

    get base(): SimpleSaves {
        return this._base.copy();
    }

    get enhance(): SimpleSaves {
        return this._ehn.copy();
    }

    get gear(): SimpleSaves {
        return this._gear.copy();
    }

    get misc(): SimpleSaves {
        return this._misc.copy();
    }

    get temp(): SimpleSaves {
        return this._temp.copy();
    }

    get fort(): SaveBreakdown {
        return new SaveBreakdown({
            base: this._base.fort,
            stat: this._stats.totalMods.CON,
            enhance: this._ehn.fort,
            gear: this._gear.fort,
            misc: this._misc.fort,
            temp: this._temp.fort,
        });
    }

    get refl(): SaveBreakdown {
        return new SaveBreakdown({
            base: this._base.refl,
            stat: this._stats.totalMods.DEX,
            enhance: this._ehn.refl,
            gear: this._gear.refl,
            misc: this._misc.refl,
            temp: this._temp.refl,
        });
    }

    get will(): SaveBreakdown {
        return new SaveBreakdown({
            base: this._base.will,
            stat: this._stats.totalMods.WIS,
            enhance: this._ehn.will,
            gear: this._gear.will,
            misc: this._misc.will,
            temp: this._temp.will,
        });
    }
}

export type { SimpleSavesBuilder };

export { Saves, SimpleSaves, SaveBreakdown };
