import { FlyManeuverability } from '@wowfinder/ts-enums';
import { defaultSpeedUnit, Speed } from '../Scalar';
import { Debugger } from '@wowfinder/ts-utils';

type FM = FlyManeuverability;

function flyManeuverabilityBonus(maneuverability: FM): number {
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
        default:
            return Debugger.unreachable(maneuverability);
    }
}

type MaybeManeuverability = FlyManeuverability | string | undefined;
function flyManeuverabilityCompare(
    a: MaybeManeuverability,
    b: MaybeManeuverability,
): number {
    const knownKeys = Object.keys(FlyManeuverability);
    if (!knownKeys.includes(a as string)) {
        a = undefined;
    }
    if (!knownKeys.includes(b as string)) {
        b = undefined;
    }
    if (a === b) {
        return 0;
    }
    if (a === undefined) {
        return -1;
    }
    if (b === undefined) {
        return 1;
    }
    return flyManeuverabilityBonus(a as FM) - flyManeuverabilityBonus(b as FM);
}

const ManeuverabilitySortedValues = Object.keys(FlyManeuverability).sort(
    flyManeuverabilityCompare,
);

function maxFlyManeuverability(
    ...values: MaybeManeuverability[]
): MaybeManeuverability {
    return values.reduce((max, value) => {
        if (flyManeuverabilityCompare(value, max) > 0) {
            return value;
        }
        return max;
    }, undefined);
}

type SpeedValue = number | Speed; // number taken as feet/turn

type SpeedBuilder = {
    base: SpeedValue;
    fly?: SpeedValue;
    swim?: SpeedValue;
    burrow?: SpeedValue;
    climb?: SpeedValue;
    encumberance?: boolean;
    maneuverability?: FlyManeuverability;
};

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
    readonly #base: number;
    readonly #fly: number;
    readonly #swim: number;
    readonly #burrow: number;
    readonly #climb: number;
    readonly #encumberance: boolean;
    readonly #maneuverablity: FlyManeuverability;

    constructor({
        base,
        fly = 0,
        swim = 0,
        burrow = 0,
        climb = 0,
        encumberance = true,
        maneuverability = FlyManeuverability.average,
    }: SpeedBuilder) {
        this.#base = asFeet(base);
        this.#fly = asFeet(fly);
        this.#swim = asFeet(swim);
        this.#burrow = asFeet(burrow);
        this.#climb = asFeet(climb);
        this.#encumberance = encumberance;
        this.#maneuverablity = maneuverability;
    }

    get base(): Speed {
        return wrap(this.#base);
    }

    get fly(): Speed {
        return wrap(this.#fly);
    }

    get maneuverability(): FlyManeuverability {
        return this.#maneuverablity;
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

    get encumberance(): boolean {
        return this.#encumberance;
    }

    get reduced(): Speed {
        return wrap(this.#encumberance ? encumbered(this.#base) : this.#base);
    }

    export(): Required<SpeedBuilder> {
        return {
            base: this.#base,
            fly: this.#fly,
            swim: this.#swim,
            burrow: this.#burrow,
            climb: this.#climb,
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
    flyManeuverabilityCompare,
    maxFlyManeuverability,
    type MaybeManeuverability,
};
export type { SpeedBuilder };
