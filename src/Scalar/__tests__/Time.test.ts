import { TimeUnit } from '@wowfinder/ts-enums';
import { Time, convertTime } from '../Time';
import { add } from '../Scalar';

describe('Time', () => {
    it('should construct a Time object and convert to different units', () => {
        const time = new Time({ value: 1, unit: TimeUnit.year });
        expect(time.value).toBe(1);
        expect(time.unit).toBe(TimeUnit.year);
        expect(time.convert(TimeUnit.day).value).toBe(365);
        expect(time.convert(TimeUnit.hour).value).toBe(365 * 24);
        expect(time.convert(TimeUnit.minute).value).toBe(365 * 24 * 60);
        expect(time.convert(TimeUnit.second).value).toBe(365 * 24 * 60 * 60);
        expect(time.convert(TimeUnit.turn).value).toBe(365 * 24 * 60 * 10);
    });
    it('should compute the correct number of full years', () => {
        const time = new Time({ value: 365.25, unit: TimeUnit.day });
        expect(time.fullYears).toBe(1);
    });
    it('should compute the negative time', () => {
        const time = new Time({ value: 1, unit: TimeUnit.year });
        const negativeTime = time.negative;
        expect(negativeTime.value).toBe(-1);
        expect(negativeTime.unit).toBe(TimeUnit.year);
    });
    describe('tryParseTime', () => {
        it('should parse a valid time', () => {
            const time = Time.tryParseTime('5y');
            expect(time?.value).toBe(5);
            expect(time?.unit).toBe(TimeUnit.year);
        });
        it('should parse a valid time with spaces and full-unit name', () => {
            const time = Time.tryParseTime('5 years');
            expect(time?.value).toBe(5);
            expect(time?.unit).toBe(TimeUnit.year);
        });
        it('should parse a valid time with turns', () => {
            const time = Time.tryParseTime('5t');
            expect(time?.value).toBe(5);
            expect(time?.unit).toBe(TimeUnit.turn);
        });
        it('should return undefined for invalid input', () => {
            const time = Time.tryParseTime('invalid');
            expect(time).toBeUndefined();
        });
    });
    describe('parseTime', () => {
        it('should parse a valid time', () => {
            const time = Time.parseTime('5y');
            expect(time.value).toBe(5);
            expect(time.unit).toBe(TimeUnit.year);
        });
        it('should throw for invalid input', () => {
            expect(() => Time.parseTime('invalid')).toThrow();
        });
    });
    describe('add', () => {
        it('should add two times', () => {
            const time1 = new Time({ value: 1, unit: TimeUnit.year });
            const time2 = new Time({ value: 365, unit: TimeUnit.day });
            const sum = add(TimeUnit.year, convertTime, time1, time2);
            expect(sum.value).toBe(2);
            expect(sum.unit).toBe(TimeUnit.year);
            const time3 = new Time({ value: 2, unit: TimeUnit.turn });
            const time4 = new Time({ value: 12, unit: TimeUnit.second });
            const sum2 = add(TimeUnit.turn, convertTime, time3, time4);
            expect(sum2.value).toBe(4);
            expect(sum2.unit).toBe(TimeUnit.turn);
        });
        it('should add zero times', () => {
            const sum = add(TimeUnit.year, convertTime);
            expect(sum.value).toBe(0);
            expect(sum.unit).toBe(TimeUnit.year);
        });
        it('should add several times', () => {
            const sum = add(
                TimeUnit.year,
                convertTime,
                new Time({ value: 1, unit: TimeUnit.year }),
                new Time({ value: 2, unit: TimeUnit.year }),
                new Time({ value: 3, unit: TimeUnit.year }),
                new Time({ value: 4, unit: TimeUnit.year }),
            );
            expect(sum.value).toBe(10);
            expect(sum.unit).toBe(TimeUnit.year);
        });
    });
    describe('max', () => {
        it('should return the maximum of two times', () => {
            const time1 = new Time({ value: 2, unit: TimeUnit.year });
            const time2 = new Time({ value: 365, unit: TimeUnit.day });
            const maxTime = Time.max(time1, time2);
            expect(maxTime.value).toBe(2);
            expect(maxTime.unit).toBe(TimeUnit.year);
        });
        it('should return the maximum of several times', () => {
            const time1 = new Time({ value: 1, unit: TimeUnit.week });
            const time2 = new Time({ value: 1, unit: TimeUnit.hour });
            const time3 = new Time({ value: 1, unit: TimeUnit.second });
            const maxTime = Time.max(time1, time2, time3);
            expect(maxTime.value).toBe(1);
            expect(maxTime.unit).toBe(TimeUnit.week);
        });
        it('should return a zero value when no times are provided', () => {
            const maxTime = Time.max();
            expect(maxTime.value).toBe(0);
            expect(maxTime.isZero).toBeTruthy();
        });
    });
});
