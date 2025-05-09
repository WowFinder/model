import { sum } from '@wowfinder/ts-utils';
import { Speeds, type SpeedBuilder } from '../Creature/Speeds';

type SpeedsProfileBuilder = SpeedBuilder & {
    dexBonus?: number;
    otherInitiativeModifiers?: number[];
};

class SpeedsProfile extends Speeds {
    readonly #dexBonus: number;
    readonly #initiativeBonuses: number[];

    constructor({
        dexBonus = 0,
        otherInitiativeModifiers = [],
        ...speeds
    }: SpeedsProfileBuilder) {
        super(speeds);
        this.#dexBonus = dexBonus;
        this.#initiativeBonuses = otherInitiativeModifiers;
    }

    get initiative(): number {
        return sum(this.#dexBonus, ...this.#initiativeBonuses);
    }

    export(): Required<SpeedsProfileBuilder> {
        return {
            ...super.export(),
            dexBonus: this.#dexBonus,
            otherInitiativeModifiers: this.#initiativeBonuses,
        };
    }
}

export { SpeedsProfile };
