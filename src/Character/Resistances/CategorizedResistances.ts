import { DamageType } from '@wowfinder/ts-enums';
import {
    ResistanceBreakdownImpl,
    ResistanceBreakdown,
} from './ResistanceBreakdown';
import { ResistanceCategory } from './ResistanceCategory';
import {
    ResistanceSetImpl,
    ResistanceSet,
    ResistancePartialSet,
} from './ResistanceSet';

type CategorizedResistancesBase = {
    [key in ResistanceCategory]: ResistanceSet;
};

type CategorizedResistancesBuilder = {
    [key in ResistanceCategory]?: ResistancePartialSet;
};

class CategorizedResistances
    implements CategorizedResistancesBase, CategorizedResistancesBuilder
{
    readonly #enh: ResistanceSet;
    readonly #gear: ResistanceSet;
    readonly #misc: ResistanceSet;
    readonly #temp: ResistanceSet;

    constructor({ enhance, gear, misc, temp }: CategorizedResistancesBuilder) {
        this.#enh = new ResistanceSetImpl(enhance ?? {});
        this.#gear = new ResistanceSetImpl(gear ?? {});
        this.#misc = new ResistanceSetImpl(misc ?? {});
        this.#temp = new ResistanceSetImpl(temp ?? {});
    }

    get enhance(): ResistanceSet {
        return this.#enh;
    }

    get gear(): ResistanceSet {
        return this.#gear;
    }

    get misc(): ResistanceSet {
        return this.#misc;
    }

    get temp(): ResistanceSet {
        return this.#temp;
    }

    byType(type: DamageType): ResistanceBreakdown {
        return new ResistanceBreakdownImpl({
            enhance: this.#enh[type],
            gear: this.#gear[type],
            misc: this.#misc[type],
            temp: this.#temp[type],
        });
    }
}

export type { CategorizedResistancesBase, CategorizedResistancesBuilder };
export { CategorizedResistances };
