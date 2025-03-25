import { FlyManeuverability } from '@wowfinder/ts-enums';
import { Speeds, defaultSpeedUnit, flyManeuverabilityBonus } from '../Speeds';
import {
    mockedSpeedCustomRawAsset,
    mockedSpeedNegativeRawAsset,
    mockedSpeedSimpleRawAsset,
    mockedSpeedSlowRawAsset,
} from '../../__mocks__/Creature/speed';

describe('Speeds', () => {
    test('should create a Speeds instance with default values', () => {
        const speeds = new Speeds(mockedSpeedSimpleRawAsset);

        expect(speeds.base.value).toBe(30);
        expect(speeds.base.unit).toEqual(defaultSpeedUnit);
        expect(speeds.fly.value).toBe(0);
        expect(speeds.swim.value).toBe(0);
        expect(speeds.burrow.value).toBe(0);
        expect(speeds.climb.value).toBe(0);
        expect(speeds.encumbered.value).toBe(20);
        expect(speeds.maneuverability).toBe('average');
    });

    test('should create a Speeds instance with custom values', () => {
        const speeds = new Speeds(mockedSpeedCustomRawAsset);

        expect(speeds.base.value).toBe(30);
        expect(speeds.base.unit).toEqual(defaultSpeedUnit);
        expect(speeds.fly.value).toBe(60);
        expect(speeds.swim.value).toBe(20);
        expect(speeds.burrow.value).toBe(10);
        expect(speeds.climb.value).toBe(15);
        expect(speeds.encumbered.value).toBe(30);
        expect(speeds.maneuverability).toBe('good');
    });
    it('should compute correct values for unusual corner cases', () => {
        const speedsSlow = new Speeds(mockedSpeedSlowRawAsset);
        expect(speedsSlow.encumbered.value).toBe(10);
        const speedsNegative = new Speeds(mockedSpeedNegativeRawAsset);
        expect(speedsNegative.encumbered.value).toBe(-15);
    });
    it('should export correctly', () => {
        const speeds = new Speeds(mockedSpeedCustomRawAsset);
        expect(speeds.export()).toEqual({
            base: 30,
            fly: 60,
            swim: 20,
            burrow: 10,
            climb: 15,
            encumberance: false,
            maneuverability: 'good',
        });
    });
    it('should return a valid zero object', () => {
        const speeds = Speeds.zero;
        expect(speeds.base.value).toBe(0);
        expect(speeds.base.unit).toEqual(defaultSpeedUnit);
        expect(speeds.fly.value).toBe(0);
        expect(speeds.swim.value).toBe(0);
        expect(speeds.burrow.value).toBe(0);
        expect(speeds.climb.value).toBe(0);
        expect(speeds.encumbered.value).toBe(0);
        expect(speeds.maneuverability).toBe('average');
    });
    it('should return correct default speeds', () => {
        const speeds = Speeds.default;
        expect(speeds.base.value).toBe(30);
        expect(speeds.base.unit).toEqual(defaultSpeedUnit);
        expect(speeds.fly.value).toBe(0);
        expect(speeds.swim.value).toBe(0);
        expect(speeds.burrow.value).toBe(0);
        expect(speeds.climb.value).toBe(0);
        expect(speeds.encumbered.value).toBe(20);
        expect(speeds.maneuverability).toBe('average');
    });
});
describe('flyManeuverabilityBonus', () => {
    it('should return -8 for clumsy', () => {
        expect(flyManeuverabilityBonus(FlyManeuverability.clumsy)).toBe(-8);
    });
    it('should return -4 for poor', () => {
        expect(flyManeuverabilityBonus(FlyManeuverability.poor)).toBe(-4);
    });
    it('should return 0 for average', () => {
        expect(flyManeuverabilityBonus(FlyManeuverability.average)).toBe(0);
    });
    it('should return 4 for good', () => {
        expect(flyManeuverabilityBonus(FlyManeuverability.good)).toBe(4);
    });
    it('should return 8 for perfect', () => {
        expect(flyManeuverabilityBonus(FlyManeuverability.perfect)).toBe(8);
    });
    it('should throw for invalid values', () => {
        expect(() =>
            flyManeuverabilityBonus('invalid' as FlyManeuverability),
        ).toThrow();
    });
});
