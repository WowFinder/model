import { LengthUnit } from '@wowfinder/ts-enums';
import { Length } from '../Length';

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
    describe('zero', () => {
        it('should return a zero length in the default unit', () => {
            const length = Length.zero;
            expect(length.value).toBe(0);
            expect(length.unit).toBe(LengthUnit.meter);
        });
    });
    describe('add', () => {
        it('should add lengths of the same unit', () => {
            const length1 = new Length({ value: 5, unit: LengthUnit.meter });
            const length2 = new Length({ value: 3, unit: LengthUnit.meter });
            const result = Length.add(LengthUnit.meter, length1, length2);
            expect(result.value).toBe(8);
            expect(result.unit).toBe(LengthUnit.meter);
        });
        it('should add lengths of different units', () => {
            const length1 = new Length({ value: 5, unit: LengthUnit.meter });
            const length2 = new Length({ value: 2, unit: LengthUnit.foot });
            const length3 = new Length({ value: 12, unit: LengthUnit.inch });
            const result = Length.add(
                LengthUnit.meter,
                length1,
                length2,
                length3,
            );
            expect(result.value).toBeCloseTo(5.9144, 4);
            expect(result.unit).toBe(LengthUnit.meter);
        });
    });
    describe('multiply', () => {
        it('should multiply a length by a scalar', () => {
            const length = new Length({ value: 5, unit: LengthUnit.meter });
            const result = Length.multiply(length, 2);
            expect(result.value).toBe(10);
            expect(result.unit).toBe(LengthUnit.meter);
        });
    });
    describe('max', () => {
        it('should return the maximum of two lengths', () => {
            const length1 = new Length({ value: 5, unit: LengthUnit.meter });
            const length2 = new Length({ value: 15, unit: LengthUnit.foot });
            const result = Length.max(length1, length2);
            expect(result.value).toBe(5);
            expect(result.unit).toBe(LengthUnit.meter);
        });
        it('should return the maximum of multiple lengths in different units', () => {
            const length1 = new Length({ value: 5, unit: LengthUnit.meter });
            const length2 = new Length({ value: 15, unit: LengthUnit.foot });
            const length3 = new Length({ value: 197, unit: LengthUnit.inch });
            const result = Length.max(length1, length2, length3);
            expect(result.value).toBeCloseTo(5.0038, 4);
            expect(result.unit).toBe(LengthUnit.meter);
            expect(result.convert(LengthUnit.inch).value).toBeCloseTo(197, 4);
        });
        it('should return zero when no lengths are provided', () => {
            const result = Length.max();
            expect(result.value).toBe(0);
            expect(result.unit).toBe(LengthUnit.meter);
        });
    });
});
