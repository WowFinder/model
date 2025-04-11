import type { Save } from '@wowfinder/ts-enums';

type SaveBreakdownBuilder = {
    base: number;
    stat: number;
    enhancement: number;
    gear: number;
    misc: number;
    temporary: number;
};

class SaveBreakdown {
    readonly #base: number;
    readonly #stat: number;
    readonly #enhancement: number;
    readonly #gear: number;
    readonly #misc: number;
    readonly #temporary: number;
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

type SaveBreakdowns = { [key in Save]: SaveBreakdown };

export type { SaveBreakdownBuilder, SaveBreakdowns };
export { SaveBreakdown };
