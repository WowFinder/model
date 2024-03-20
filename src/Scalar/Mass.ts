import { MassUnit } from '@wowfinder/ts-enums';
import { converter, makeConverter, Scalar } from './Scalar';

const kgInLb = 0.45359237; // By international definition

const convertMass: converter<MassUnit> = makeConverter({
    [MassUnit.pound]: kgInLb,
    [MassUnit.gram]: 1 / 1000, // 1000 g = 1 kg
    [MassUnit.kilogram]: 1, // Reference unit
    [MassUnit.ounce]: kgInLb / 16, // 16 oz = 1 pound
});

const massUnitAliases: { [key: string]: MassUnit } = {
    kg: MassUnit.kilogram,
    g: MassUnit.gram,
    lb: MassUnit.pound,
    oz: MassUnit.ounce,
};

class Mass extends Scalar<MassUnit> {
    get pounds(): number {
        return convertMass(this, MassUnit.pound).value;
    }

    convert(to: MassUnit): Mass {
        const { value, unit } = convertMass(this, to);
        return new Mass({
            value,
            unit,
        });
    }

    static asPounds(w: Weight): Mass {
        return w instanceof Mass
            ? w.convert(MassUnit.pound)
            : new Mass({ value: w, unit: MassUnit.pound });
    }

    static tryParseMass(input: string): Mass | undefined {
        const base = Scalar.tryParse(
            input,
            (unit: string) =>
                MassUnit[unit as keyof typeof MassUnit] ??
                massUnitAliases[unit],
        );
        return base ? new Mass(base) : undefined;
    }
}

type Weight = number | Mass;

export type { Weight };
export { convertMass, Mass };
