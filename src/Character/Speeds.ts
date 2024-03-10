import { FlyManeuverability, LengthUnit, TimeUnit } from '@wowfinder/ts-enums';
import { Speed, SpeedUnit } from '../Scalar';

function flyManeuverabilityBonus(maneuverability: FlyManeuverability): number {
    switch (maneuverability) {
        case FlyManeuverability.clumsy:
            return -8;
        case FlyManeuverability.poor:
            return -4;
        case FlyManeuverability.average:
            return 0;
        case FlyManeuverability.good:
            return 4;
        case FlyManeuverability.perfect:
            return 8;
    }
}

const ManeuverabilitySortedValues = Object.keys(FlyManeuverability).sort(
    (a, b) =>
        flyManeuverabilityBonus(a as FlyManeuverability) -
        flyManeuverabilityBonus(b as FlyManeuverability),
);

type SpeedValue = number | Speed; // number taken as feet/turn

const defaultSpeedUnit = new SpeedUnit({
    length: LengthUnit.foot,
    time: TimeUnit.turn,
});

interface SpeedBuilder {
    base: SpeedValue;
    fly?: SpeedValue;
    swim?: SpeedValue;
    burrow?: SpeedValue;
    climb?: SpeedValue;
    misc?: SpeedValue;
    encumberance?: boolean;
    maneuverability?: FlyManeuverability;
}

function asFeet(value: SpeedValue): number {
    if (!value) {
        return 0;
    }
    if (typeof value === 'number') {
        return new Speed({ value, unit: defaultSpeedUnit }).value;
    }
    return value.convert(defaultSpeedUnit).value;
}

function encumbered(value: number): number {
    const penalty = value >= 30 ? 10 : 5;
    const isPositive = value > 0;
    return isPositive ? value - penalty : value;
}

const wrap: (value: number) => Speed = value =>
    new Speed({ value, unit: defaultSpeedUnit });

class Speeds {
    #base: number;
    #fly: number;
    #swim: number;
    #burrow: number;
    #climb: number;
    #misc: number;
    #encumberance: boolean;
    #maneuverablity: FlyManeuverability;

    constructor({
        base,
        fly = 0,
        swim = 0,
        burrow = 0,
        climb = 0,
        misc = 0,
        encumberance = true,
        maneuverability = FlyManeuverability.average,
    }: SpeedBuilder) {
        this.#base = asFeet(base);
        this.#fly = asFeet(fly);
        this.#swim = asFeet(swim);
        this.#burrow = asFeet(burrow);
        this.#climb = asFeet(climb);
        this.#misc = asFeet(misc);
        this.#encumberance = encumberance;
        this.#maneuverablity = maneuverability;
    }

    get base(): Speed {
        return wrap(this.#base);
    }

    get fly(): { speed: Speed; maneuverability: FlyManeuverability } {
        return {
            speed: wrap(this.#fly),
            maneuverability: this.#maneuverablity,
        };
    }

    get swim(): Speed {
        return wrap(this.#swim);
    }

    get burrow(): Speed {
        return wrap(this.#burrow);
    }

    get climb(): Speed {
        return wrap(this.#climb);
    }

    get misc(): Speed {
        return wrap(this.#misc);
    }

    get encumbered(): Speed {
        return wrap(this.#encumberance ? encumbered(this.#base) : this.#base);
    }

    export(): Required<SpeedBuilder> {
        return {
            base: this.#base,
            fly: this.#fly,
            swim: this.#swim,
            burrow: this.#burrow,
            climb: this.#climb,
            misc: this.#misc,
            encumberance: this.#encumberance,
            maneuverability: this.#maneuverablity,
        };
    }

    static get zero(): Speeds {
        return new Speeds({ base: 0 });
    }

    static get default(): Speeds {
        return new Speeds({ base: 30 });
    }
}

export {
    Speeds,
    ManeuverabilitySortedValues,
    flyManeuverabilityBonus,
    defaultSpeedUnit,
};
export type { SpeedBuilder };
