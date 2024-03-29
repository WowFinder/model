import { LengthUnit, TimeUnit } from '@wowfinder/ts-enums';
import { converter, Scalar } from './Scalar';
import { convertLength, Length } from './Length';
import { convertTime, Time } from './Time';

interface SpeedUnitBuilder {
    length: LengthUnit;
    time: TimeUnit;
}

class SpeedUnit {
    #length: LengthUnit;
    #time: TimeUnit;
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

export { SpeedUnit, Speed, convertSpeed };
