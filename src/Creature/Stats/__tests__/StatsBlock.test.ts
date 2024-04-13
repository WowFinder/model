import { StatsBlock } from '../StatsBlock';
import {
    meleeBonusesStatsMock,
    mixedBonusStatsMock,
    mixedStatsMock,
} from '../../../__mocks__';
import {
    addStatSets,
    baseDefault,
    scaleStatSet,
    zeroDefault,
} from '../helpers';

describe('StatsBlock', () => {
    const testingStats = new StatsBlock({
        base: mixedStatsMock,
        racial: mixedBonusStatsMock,
        enhance: meleeBonusesStatsMock,
        gear: scaleStatSet(meleeBonusesStatsMock, 0.5),
        misc: scaleStatSet(mixedBonusStatsMock, 1.5),
        temp: scaleStatSet(mixedBonusStatsMock, 2),
    });
    const expectedTotal = addStatSets(
        mixedStatsMock,
        mixedBonusStatsMock,
        meleeBonusesStatsMock,
        scaleStatSet(meleeBonusesStatsMock, 0.5),
        scaleStatSet(mixedBonusStatsMock, 1.5),
        scaleStatSet(mixedBonusStatsMock, 2),
    );
    it('should use the correct defaults for the constructor', () => {
        const defaultStats = new StatsBlock({});
        expect(defaultStats.base).toEqual(baseDefault);
    });
    it('should compute totals correctly', () => {
        expect(testingStats.totals).toEqual(expectedTotal);
    });
    it('should compute intrinsic values correctly', () => {
        const expectedIntrinsic = addStatSets(
            mixedStatsMock,
            mixedBonusStatsMock,
        );
        expect(testingStats.intrinsic).toEqual(expectedIntrinsic);
    });
    it('should return the correct base values', () => {
        expect(testingStats.base).toEqual(mixedStatsMock);
    });
    it('should return the correct racial values', () => {
        expect(testingStats.racial).toEqual(mixedBonusStatsMock);
    });
    it('should return the correct enhancement values', () => {
        expect(testingStats.enhance).toEqual(meleeBonusesStatsMock);
    });
    it('should return the correct gear values', () => {
        expect(testingStats.gear).toEqual(
            scaleStatSet(meleeBonusesStatsMock, 0.5),
        );
    });
    it('should return the correct misc values', () => {
        expect(testingStats.misc).toEqual(
            scaleStatSet(mixedBonusStatsMock, 1.5),
        );
    });
    it('should return the correct temp values', () => {
        expect(testingStats.temp).toEqual(scaleStatSet(mixedBonusStatsMock, 2));
    });
    it('should return the correct active values', () => {
        const expectedActive = addStatSets(
            mixedStatsMock,
            mixedBonusStatsMock,
            meleeBonusesStatsMock,
        );
        expect(testingStats.active).toEqual(expectedActive);
    });
    describe('updated', () => {
        it('should return a new stats block with the corresponding parts replaced', () => {
            const newStats = testingStats.updated({
                base: baseDefault,
                racial: zeroDefault,
                enhance: zeroDefault,
                gear: zeroDefault,
                misc: zeroDefault,
                temp: zeroDefault,
            });
            expect(newStats.base).toEqual(baseDefault);
            expect(newStats.racial).toEqual(zeroDefault);
            expect(newStats.enhance).toEqual(zeroDefault);
            expect(newStats.gear).toEqual(zeroDefault);
            expect(newStats.misc).toEqual(zeroDefault);
            expect(newStats.temp).toEqual(zeroDefault);
        });
        it('should use current values as defaults', () => {
            const newStats = testingStats.updated({});
            expect(newStats.base).toEqual(testingStats.base);
            expect(newStats.racial).toEqual(testingStats.racial);
            expect(newStats.enhance).toEqual(testingStats.enhance);
            expect(newStats.gear).toEqual(testingStats.gear);
            expect(newStats.misc).toEqual(testingStats.misc);
            expect(newStats.temp).toEqual(testingStats.temp);
        });
    });
});
