import { LengthUnit, Size, StandardRange } from '@wowfinder/ts-enums';
import { Length } from '../../Scalar';

function rangeInFeet(range: StandardRange, size: Size, efl: number): number {
    switch (range) {
        case StandardRange.self:
            return 0;
        case StandardRange.touch:
            return Math.max(0, 5 * (1 + size));
        case StandardRange.close:
            return 25 + Math.floor(efl / 2) * 5;
        case StandardRange.medium:
            return 100 + 10 * efl;
        case StandardRange.long:
            return 400 + 40 * efl;
    }
}

function computeRange(range: StandardRange, size: Size, efl: number): Length {
    return new Length({
        value: rangeInFeet(range, size, efl),
        unit: LengthUnit.foot,
    });
}

type SpellRange = StandardRange | Length | 'special';

const SpellRange = {
    tryParse(input: string): SpellRange | undefined {
        if (input === 'special') {
            return 'special';
        }
        const standardRange =
            StandardRange[input as keyof typeof StandardRange];
        if (standardRange) {
            return standardRange;
        }
        const length = Length.tryParseLength(input);
        if (length) {
            return length;
        }
        return undefined;
    },

    forceParse(
        input: string,
        defaultValue: SpellRange = 'special',
    ): SpellRange {
        return SpellRange.tryParse(input) ?? defaultValue;
    },
} as const;

export { SpellRange, computeRange };
