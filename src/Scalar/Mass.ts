import { MassUnit } from '@wowfinder/ts-enums';
import { converter, makeConverter, Scalar } from './base';

const kgInLb = 0.45359237; // By international definition

const convertMass: converter<MassUnit> = makeConverter({
    [MassUnit.pound]: kgInLb,
    [MassUnit.gram]: 1 / 1000, // 1000 g = 1 kg
    [MassUnit.kilogram]: 1, // Reference unit
    [MassUnit.ounce]: kgInLb / 16, // 16 oz = 1 pound
});

class Mass extends Scalar<MassUnit> {
    get pounds(): number {
        return convertMass(this, MassUnit.pound).value;
    }

    static asPounds(w: Weight): Mass {
        return w instanceof Mass
            ? w
            : new Mass({ value: w, unit: MassUnit.pound });
    }
}

type Weight = number | Mass;

export type { Weight };
export { convertMass, Mass };
