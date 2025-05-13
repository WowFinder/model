import { sum } from '@wowfinder/ts-utils';
import { Speeds, type SpeedBuilder } from '../Creature/Speeds';
import { SpeedsModifiersBonus } from '../Bonus';
import { Speed } from '../Scalar';

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

function addSpeeds(
    base: SpeedsProfile,
    ...bonuses: SpeedsModifiersBonus[]
): SpeedsProfile {
    const totalBonuses = SpeedsModifiersBonus.sum(...bonuses);
    const newSpeeds = {
        base: Speed.add(base.base.unit, base.base, totalBonuses.baseSpeed),
        swim: Speed.add(base.swim.unit, base.swim, totalBonuses.swimSpeed),
        fly: Speed.add(base.fly.unit, base.fly, totalBonuses.flySpeed),
        climb: Speed.add(base.climb.unit, base.climb, totalBonuses.climbSpeed),
        burrow: Speed.add(
            base.burrow.unit,
            base.burrow,
            totalBonuses.burrowSpeed,
        ),
    };
    return new SpeedsProfile(newSpeeds);
}

export { SpeedsProfile, addSpeeds };
