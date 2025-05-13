import { LengthUnit, TimeUnit } from '@wowfinder/ts-enums';
import { Length, convertLength } from './Length';
import { Scalar, converter } from './Scalar';
import { Time, convertTime } from './Time';
import { sum } from '@wowfinder/ts-utils';

type SpeedUnitBuilder = {
    length: LengthUnit;
    time: TimeUnit;
};

class SpeedUnit {
    readonly #length: LengthUnit;
    readonly #time: TimeUnit;
    constructor({ length, time }: SpeedUnitBuilder) {
        this.#length = length;
        this.#time = time;
    }

    get length(): LengthUnit {
        return this.#length;
    }

    get time(): TimeUnit {
        return this.#time;
    }
}

const commonSpeedUnits = {
    feetTurn: new SpeedUnit({
        length: LengthUnit.foot,
        time: TimeUnit.turn,
    }),
    metersSecond: new SpeedUnit({
        length: LengthUnit.meter,
        time: TimeUnit.second,
    }),
    milesHour: new SpeedUnit({
        length: LengthUnit.mile,
        time: TimeUnit.hour,
    }),
    milesDay: new SpeedUnit({
        length: LengthUnit.mile,
        time: TimeUnit.day,
    }),
    kilometersHour: new SpeedUnit({
        length: LengthUnit.kiloMeter,
        time: TimeUnit.hour,
    }),
};

const defaultSpeedUnit = commonSpeedUnits.feetTurn;

class Speed extends Scalar<SpeedUnit> {
    convert(to: SpeedUnit): Speed {
        const length = convertLength(
            new Length({ value: this.value, unit: this.unit.length }),
            to.length,
        );
        const timeFactor = convertTime(
            new Time({ value: 1, unit: this.unit.time }),
            to.time,
        );
        return new Speed({
            value: length.value / timeFactor.value,
            unit: new SpeedUnit({
                length: length.unit,
                time: timeFactor.unit,
            }),
        });
    }

    get negative(): Speed {
        return new Speed({
            value: -this.value,
            unit: this.unit,
        });
    }

    as(unit: SpeedUnit): number {
        return this.convert(unit).value;
    }

    static get zero(): Speed {
        return new Speed({
            value: 0,
            unit: commonSpeedUnits.feetTurn,
        });
    }

    static add(unit: SpeedUnit, ...values: Speed[]): Speed {
        return new Speed({
            value: sum(...values.map(v => v.convert(unit).value)),
            unit,
        });
    }

    static multiply(speed: Speed, factor: number): Speed {
        return new Speed({
            value: speed.value * factor,
            unit: speed.unit,
        });
    }

    static max(...speeds: Speed[]): Speed {
        if (speeds.length === 0) {
            return Speed.zero;
        }
        const unit = speeds[0].unit;
        return new Speed({
            value: Math.max(...speeds.map(s => s.convert(unit).value)),
            unit,
        });
    }

    static fromValue(value: number): Speed {
        return new Speed({
            value,
            unit: defaultSpeedUnit,
        });
    }
}

const convertSpeed: converter<SpeedUnit> = (magnitude, to) =>
    new Speed(magnitude).convert(to);

function encumberedRaw(rawSpeed: number): number {
    // assumes ft/turn; matches PFCRB given values from 5 to 120 ft/turn
    // Ref: https://legacy.aonprd.com/coreRulebook/additionalRules.html#armor-and-encumbrance-for-other-base-speeds
    return 5 * Math.ceil((2 * rawSpeed) / 15);
}

function encumbered(speed: Speed): Speed {
    return new Speed({
        value: encumberedRaw(speed.convert(commonSpeedUnits.feetTurn).value),
        unit: commonSpeedUnits.feetTurn,
    });
}

export {
    Speed,
    SpeedUnit,
    commonSpeedUnits,
    defaultSpeedUnit,
    convertSpeed,
    encumbered,
    encumberedRaw,
};
