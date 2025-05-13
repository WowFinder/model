import { LengthUnit } from '@wowfinder/ts-enums';
import { Length, convertLength } from '../Length';
import { add } from '../Scalar';

describe('Length', () => {
    it('should construct a length and convert to different units', () => {
        const length = new Length({ value: 1, unit: LengthUnit.meter });
        expect(length.convert(LengthUnit.meter).value).toBe(1);
        expect(length.convert(LengthUnit.centiMeter).value).toBe(100);
        expect(length.convert(LengthUnit.inch).value).toBeCloseTo(39.3701, 4);
    });
    describe('feetInches', () => {
        it('should properly format as feet and inches', () => {
            const length = new Length({ value: 75, unit: LengthUnit.inch });
            expect(length.feetInches).toBe('6\' 3"');
        });
        it('should omit feet if zero', () => {
            const length = new Length({ value: 11, unit: LengthUnit.inch });
            expect(length.feetInches).toBe('11"');
        });
        it('should omit inches if zero', () => {
            const length = new Length({ value: 6, unit: LengthUnit.foot });
            expect(length.feetInches).toBe("6'");
        });
        it('should return unitless zero if zero', () => {
            const length = new Length({ value: 0, unit: LengthUnit.inch });
            expect(length.feetInches).toBe('0');
        });
    });
    it('should compute the correct number of inches', () => {
        const length = new Length({ value: 3, unit: LengthUnit.yard });
        expect(length.inches).toBe(108);
    });
    it('should properly format for full display', () => {
        const length = new Length({ value: 5, unit: LengthUnit.yard });
        expect(length.fullDisplay).toBe("15' (5m) (3□)");
    });
    it('should compute the negative length', () => {
        const length = new Length({ value: 1, unit: LengthUnit.meter });
        const negativeLength = length.negative;
        expect(negativeLength.value).toBe(-1);
        expect(negativeLength.unit).toBe(LengthUnit.meter);
    });
    describe('tryParseLength', () => {
        it('should parse a valid metric length', () => {
            const length = Length.tryParseLength('5m');
            expect(length?.value).toBe(5);
            expect(length?.unit).toBe(LengthUnit.meter);
        });
        it('should parse a valid imperial length', () => {
            const length = Length.tryParseLength("5'");
            expect(length?.value).toBe(5);
            expect(length?.unit).toBe(LengthUnit.foot);
        });
        it('should parse a valid length in grid squares', () => {
            const length = Length.tryParseLength('5□');
            expect(length?.value).toBe(5);
            expect(length?.unit).toBe(LengthUnit.square);
        });
        it('should parse a valid length with spaces and full-unit name', () => {
            const length = Length.tryParseLength('5 centiMeters');
            expect(length?.value).toBe(5);
            expect(length?.unit).toBe(LengthUnit.centiMeter);
        });
        it('should return undefined for invalid input', () => {
            const length = Length.tryParseLength('invalid');
            expect(length).toBeUndefined();
        });
    });
    describe('add', () => {
        it('should add two lengths (imprerial)', () => {
            const length1 = new Length({ value: 24, unit: LengthUnit.inch });
            const length2 = new Length({ value: 1, unit: LengthUnit.yard });
            const sum = add(LengthUnit.inch, convertLength, length1, length2);
            expect(sum.value).toBe(60);
            expect(sum.unit).toBe(LengthUnit.inch);
        });
        it('should add two lengths (metric)', () => {
            const length1 = new Length({ value: 1, unit: LengthUnit.meter });
            const length2 = new Length({
                value: 1,
                unit: LengthUnit.centiMeter,
            });
            const sum = add(LengthUnit.meter, convertLength, length1, length2);
            expect(sum.value).toBe(1.01);
            expect(sum.unit).toBe(LengthUnit.meter);
        });
        it('should add two lengths (mixed)', () => {
            const length1 = new Length({ value: 1, unit: LengthUnit.square });
            const length2 = new Length({ value: 0.5, unit: LengthUnit.meter });
            const sum = add(
                LengthUnit.centiMeter,
                convertLength,
                length1,
                length2,
            );
            expect(sum.value).toBeCloseTo(202.4, 1);
        });
        it('should add zero lengths', () => {
            const sum = add(LengthUnit.inch, convertLength);
            expect(sum.value).toBe(0);
            expect(sum.unit).toBe(LengthUnit.inch);
        });
        it('should add several lengths', () => {
            const sum = add(
                LengthUnit.inch,
                convertLength,
                new Length({ value: 1, unit: LengthUnit.inch }),
                new Length({ value: 2, unit: LengthUnit.inch }),
                new Length({ value: 3, unit: LengthUnit.inch }),
                new Length({ value: 4, unit: LengthUnit.inch }),
            );
            expect(sum.value).toBe(10);
            expect(sum.unit).toBe(LengthUnit.inch);
        });
    });
});
