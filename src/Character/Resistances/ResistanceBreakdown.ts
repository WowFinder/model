import { ResistanceCategory } from './ResistanceCategory';

type ResistanceBreakdown = { [key in ResistanceCategory]: number } & {
    readonly total: number;
};

type ResistanceBreakdownBuilder = { [key in ResistanceCategory]?: number };

class ResistanceBreakdownImpl
    implements ResistanceBreakdown, ResistanceBreakdownBuilder
{
    readonly #enh: number;
    readonly #gear: number;
    readonly #misc: number;
    readonly #temp: number;
    constructor({
        enhance = 0,
        gear = 0,
        misc = 0,
        temp = 0,
    }: ResistanceBreakdownBuilder) {
        this.#enh = enhance;
        this.#gear = gear;
        this.#misc = misc;
        this.#temp = temp;
    }

    get enhance(): number {
        return this.#enh;
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

    get total(): number {
        return this.#enh + this.#gear + this.#misc + this.#temp;
    }

    static get zero(): ResistanceBreakdownImpl {
        return new ResistanceBreakdownImpl({
            enhance: 0,
            gear: 0,
            misc: 0,
            temp: 0,
        });
    }
}

export type { ResistanceBreakdown, ResistanceBreakdownBuilder };
export { ResistanceBreakdownImpl };
