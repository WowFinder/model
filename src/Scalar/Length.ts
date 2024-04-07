import { LengthUnit } from '@wowfinder/ts-enums';
import { converter, makeConverter, Scalar } from './Scalar';

const metersInYard = 0.9144; // By international definition

const convertLength: converter<LengthUnit> = makeConverter({
    [LengthUnit.yard]: metersInYard,
    [LengthUnit.foot]: metersInYard / 3, // 1 yard = 3 foot; 1 foot = 0.3048 meters
    [LengthUnit.mile]: metersInYard * 1760, // 1 mile = 1760 yard = 1609.344 meters
    [LengthUnit.square]: (metersInYard / 3) * 5, // 1 square = 5 foot
    [LengthUnit.meter]: 1, // Reference unit
    [LengthUnit.kiloMeter]: 1000, // 1 kilometer = 1000 meters
    [LengthUnit.inch]: metersInYard / (3 * 12), // 12 inch = 1 foot; 3 * 12 inches = 1 yard; 1 inch = 0.0254 meters
    [LengthUnit.centiMeter]: 1 / 100, // 100 cm = 1 m
});

const lengthUnitAliases: { [key: string]: LengthUnit } = {
    m: LengthUnit.meter,
    cm: LengthUnit.centiMeter,
    in: LengthUnit.inch,
    ft: LengthUnit.foot,
    yd: LengthUnit.yard,
    '"': LengthUnit.inch,
    "'": LengthUnit.foot,
    '□': LengthUnit.square,
};

class Length extends Scalar<LengthUnit> {
    constructor({ value, unit }: { value: number; unit: LengthUnit }) {
        super({ value, unit });
    }

    get feetInches(): string {
        if (this.value === 0) {
            return '0';
        }
        const inFeet = convertLength(this, LengthUnit.foot);
        const feet = Math.floor(+inFeet.value.toFixed(2));
        const inchesOnly = convertLength(
            new Length({
                value: inFeet.value - feet,
                unit: LengthUnit.foot,
            }),
            LengthUnit.inch,
        );
        const inches = Math.round(inchesOnly.value);
        const hasFeet = feet !== 0;
        const hasInches = inches !== 0;
        const separator = hasFeet && hasInches ? ' ' : '';
        const strFeet = hasFeet ? `${feet}'` : '';
        const strInches = hasInches ? `${inches}"` : '';
        return `${strFeet}${separator}${strInches}`;
    }

    get inches(): number {
        return convertLength(this, LengthUnit.inch).value;
    }

    get fullDisplay(): string {
        const meters = Math.round(convertLength(this, LengthUnit.meter).value);
        const squares = Math.round(
            convertLength(this, LengthUnit.square).value,
        );
        return `${this.feetInches} (${meters}m) (${squares}□)`;
    }

    convert(to: LengthUnit): Length {
        const { value, unit } = convertLength(this, to);
        return new Length({
            value,
            unit,
        });
    }

    static tryParseLength(input: string): Length | undefined {
        const base = Scalar.tryParse(
            input,
            (value: string) =>
                LengthUnit[value as keyof typeof LengthUnit] ??
                lengthUnitAliases[value],
        );
        return base ? new Length(base) : undefined;
    }
}

export { convertLength, Length };
