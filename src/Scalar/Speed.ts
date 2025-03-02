import { LengthUnit, TimeUnit } from '@wowfinder/ts-enums';
import { Length, convertLength } from './Length';
import { Scalar, converter } from './Scalar';
import { Time, convertTime } from './Time';

interface SpeedUnitBuilder {
    length: LengthUnit;
    time: TimeUnit;
}

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

    as(unit: SpeedUnit): number {
        return this.convert(unit).value;
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
    convertSpeed,
    encumbered,
    encumberedRaw,
};
