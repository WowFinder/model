import {
    Speed,
    SpeedUnit,
    commonSpeedUnits,
    convertSpeed,
    encumbered,
} from '../Speed';
import { LengthUnit, TimeUnit } from '@wowfinder/ts-enums';

describe('SpeedUnit', () => {
    it('should construct a SpeedUnit object', () => {
        const speedUnit = new SpeedUnit({
            length: LengthUnit.meter,
            time: TimeUnit.second,
        });
        expect(speedUnit.length).toBe(LengthUnit.meter);
        expect(speedUnit.time).toBe(TimeUnit.second);
    });
});

describe('Speed', () => {
    const squaresPerTurn = new SpeedUnit({
        length: LengthUnit.square,
        time: TimeUnit.turn,
    });
    const feetPerMinute = new SpeedUnit({
        length: LengthUnit.foot,
        time: TimeUnit.minute,
    });
    const metricSpeed = new SpeedUnit({
        length: LengthUnit.meter,
        time: TimeUnit.second,
    });
    // 1 minute = 10 turns; 5 feet = 1 square
    // 1 square per turn = 50 feet per minute
    const expectedConversion = 50;
    it('should construct a Speed object and convert to different units', () => {
        const speed = new Speed({ value: 1, unit: squaresPerTurn });
        expect(speed.value).toBe(1);
        expect(speed.unit).toBe(squaresPerTurn);
        expect(speed.convert(feetPerMinute).value).toBe(expectedConversion);
        expect(speed.as(feetPerMinute)).toBe(expectedConversion);
        expect(speed.as(metricSpeed)).toBeCloseTo(0.254);
    });
    it('should compute the negative speed', () => {
        const speed = new Speed({ value: 1, unit: squaresPerTurn });
        const negativeSpeed = speed.negative;
        expect(negativeSpeed.value).toBe(-1);
        expect(negativeSpeed.unit).toBe(squaresPerTurn);
    });
    describe('zero', () => {
        it('should create a zero speed object', () => {
            const speed = Speed.zero;
            expect(speed.value).toBe(0);
            expect(speed.unit).toBe(commonSpeedUnits.feetTurn);
        });
    });
    describe('add', () => {
        it('should add two speeds (game units)', () => {
            const speed1 = new Speed({ value: 1, unit: squaresPerTurn });
            const speed2 = new Speed({ value: 2, unit: squaresPerTurn });
            const sum = Speed.add(squaresPerTurn, speed1, speed2);
            expect(sum.value).toBe(3);
        });
        it('should add two speeds (metric units)', () => {
            const speed1 = new Speed({ value: 1, unit: metricSpeed });
            const speed2 = new Speed({ value: 2, unit: metricSpeed });
            const sum = Speed.add(metricSpeed, speed1, speed2);
            expect(sum.value).toBe(3);
        });
        it('should add two speeds (imperial units)', () => {
            const speed1 = new Speed({ value: 1, unit: feetPerMinute });
            const speed2 = new Speed({ value: 2, unit: feetPerMinute });
            const sum = Speed.add(feetPerMinute, speed1, speed2);
            expect(sum.value).toBe(3);
        });
        it('should add zero speeds', () => {
            const sum = Speed.add(feetPerMinute);
            expect(sum.value).toBe(0);
        });
        it('should add several speeds (mixed units)', () => {
            const sum = Speed.add(
                feetPerMinute,

                new Speed({ value: 50, unit: feetPerMinute }),
                new Speed({ value: 1, unit: squaresPerTurn }),
                new Speed({ value: 1, unit: metricSpeed }),
            );
            expect(sum.value).toBeCloseTo(296.85);
        });
    });
    describe('multiply', () => {
        it('should multiply a speed by a scalar', () => {
            const speed = new Speed({ value: 1, unit: squaresPerTurn });
            const result = Speed.multiply(speed, 2);
            expect(result.value).toBe(2);
            expect(result.unit).toBe(squaresPerTurn);
        });
    });
    describe('max', () => {
        it('should return the maximum of two speeds', () => {
            const speed1 = new Speed({ value: 1, unit: squaresPerTurn });
            const speed2 = new Speed({ value: 2, unit: squaresPerTurn });
            const result = Speed.max(speed1, speed2);
            expect(result.value).toBe(2);
            expect(result.unit).toBe(squaresPerTurn);
        });
        it('should return the maximum of multiple speeds in different units', () => {
            const speed1 = new Speed({ value: 1, unit: squaresPerTurn });
            const speed2 = new Speed({ value: 2, unit: feetPerMinute });
            const speed3 = new Speed({ value: 3, unit: metricSpeed });
            const result = Speed.max(speed1, speed2, speed3);
            expect(result.value).toBeCloseTo(11.811, 4);
            expect(result.unit).toBe(squaresPerTurn);
            expect(result.convert(metricSpeed).value).toBeCloseTo(3, 4);
        });
        it('should return zero when no speeds are provided', () => {
            const result = Speed.max();
            expect(result.value).toBe(0);
        });
    });
    describe('fromValue', () => {
        it('should create a Speed object from a value', () => {
            const speed = Speed.fromValue(5);
            expect(speed.value).toBe(5);
            expect(speed.unit).toBe(commonSpeedUnits.feetTurn);
        });
    });
    describe('convertSpeed', () => {
        it('should convert speed from one unit to another', () => {
            const speed = new Speed({ value: 1, unit: squaresPerTurn });
            const convertedSpeed = convertSpeed(speed, feetPerMinute);
            expect(convertedSpeed.value).toBeCloseTo(expectedConversion, 4);
            expect(convertedSpeed.unit).toEqual(feetPerMinute);
        });
        it('should convert speed to the same unit', () => {
            const speed = new Speed({ value: 1, unit: squaresPerTurn });
            const convertedSpeed = convertSpeed(speed, squaresPerTurn);
            expect(convertedSpeed.value).toBe(1);
            expect(convertedSpeed.unit).toEqual(squaresPerTurn);
        });
    });
    describe('encumbered', () => {
        it('should calculate encumbered speeds', () => {
            const feetEncumbered = (feet: number): number => {
                const speed = new Speed({
                    value: feet,
                    unit: commonSpeedUnits.feetTurn,
                });
                return encumbered(speed).as(commonSpeedUnits.feetTurn);
            };
            expect(feetEncumbered(30)).toBeCloseTo(20);
            expect(feetEncumbered(29)).toBeCloseTo(20);
            expect(feetEncumbered(72)).toBeCloseTo(50);
            expect(feetEncumbered(5)).toBeCloseTo(5);
        });
    });
});
