import { Save } from '@wowfinder/ts-enums';
import { RawSaves } from '@wowfinder/asset-schemas';
import { StatsBlock } from './Stats';

interface SaveBreakdownBuilder {
    base: number;
    stat: number;
    enhancement: number;
    gear: number;
    misc: number;
    temporary: number;
}

class SaveBreakdown {
    #base: number;
    #stat: number;
    #enhancement: number;
    #gear: number;
    #misc: number;
    #temporary: number;
    constructor({
        base,
        stat,
        enhancement,
        gear,
        misc,
        temporary,
    }: SaveBreakdownBuilder) {
        this.#base = base;
        this.#stat = stat;
        this.#enhancement = enhancement;
        this.#gear = gear;
        this.#misc = misc;
        this.#temporary = temporary;
    }

    get total(): number {
        return (
            this.#stat +
            this.#base +
            this.#enhancement +
            this.#gear +
            this.#misc +
            this.#temporary
        );
    }

    get base(): number {
        return this.#base;
    }

    get stat(): number {
        return this.#stat;
    }

    get enhancement(): number {
        return this.#enhancement;
    }

    get gear(): number {
        return this.#gear;
    }

    get misc(): number {
        return this.#misc;
    }

    get temporary(): number {
        return this.#temporary;
    }
}

const zeroSave = {
    fortitude: 0,
    reflexes: 0,
    will: 0,
};

function fillSaves(saves?: Partial<RawSaves>): RawSaves {
    return {
        ...zeroSave,
        ...(saves ?? {}),
    };
}

interface SavesBuilder {
    stats: StatsBlock;
    base?: Partial<RawSaves>;
    enhancement?: Partial<RawSaves>;
    gear?: Partial<RawSaves>;
    misc?: Partial<RawSaves>;
    temporary?: Partial<RawSaves>;
}

type SaveBreakdowns = { [key in Save]: SaveBreakdown };

class FullSaves implements SaveBreakdowns {
    #stats: StatsBlock;
    #base: RawSaves;
    #enhancement: RawSaves;
    #gear: RawSaves;
    #misc: RawSaves;
    #temporary: RawSaves;
    constructor({
        stats,
        base,
        enhancement,
        gear,
        misc,
        temporary,
    }: SavesBuilder) {
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

export { FullSaves, SaveBreakdown, zeroSave, fillSaves };
