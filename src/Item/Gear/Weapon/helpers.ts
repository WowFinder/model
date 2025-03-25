import { LengthUnit } from '@wowfinder/ts-enums';
import { Length } from '../../../Scalar';

type Range = number | Length;
function asFeet(r: Range): Length {
    return typeof r === 'number'
        ? new Length({ value: r, unit: LengthUnit.foot })
        : r.convert(LengthUnit.foot);
}

export { asFeet };
export type { Range };
