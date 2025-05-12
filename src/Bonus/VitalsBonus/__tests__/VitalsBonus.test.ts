import { VitalsBonus } from '../VitalsBonus';

import {
    vitalsBonusDefaultBuilder,
    vitalsBonusFullBuilder,
} from '../../../__mocks__/Bonus/VitalsBonusBuilders';
import { TimeUnit } from '@wowfinder/ts-enums';

describe('VitalsBonus', () => {
    let defaultVitalsBonus: VitalsBonus;
    let fullVitalsBonus: VitalsBonus;

    beforeEach(() => {
        defaultVitalsBonus = VitalsBonus.build(vitalsBonusDefaultBuilder);
        fullVitalsBonus = VitalsBonus.build(vitalsBonusFullBuilder);
    });

    describe('VitalsBonus constructor', () => {
        it('should create an instance with no arguments', () => {
            const vitalsBonus = new VitalsBonus();
            expect(vitalsBonus).toBeInstanceOf(VitalsBonus);
            expect(vitalsBonus.export()).toEqual(VitalsBonus.zero.export());
        });

        it('should create an instance with default values', () => {
            expect(defaultVitalsBonus).toBeInstanceOf(VitalsBonus);
            expect(defaultVitalsBonus.isZero).toBeTruthy();
        });

        it('should create an instance with full values', () => {
            expect(fullVitalsBonus).toBeInstanceOf(VitalsBonus);
            expect(
                fullVitalsBonus.breathHoldingTimeBonus.convert(TimeUnit.second)
                    .value,
            ).toEqual(120);
            expect(
                fullVitalsBonus.breathRecoveryTimeReduction.convert(
                    TimeUnit.second,
                ).value,
            ).toEqual(15);
            expect(fullVitalsBonus.maxHpBonus).toEqual(10);
            expect(fullVitalsBonus.maxSanityBonus).toEqual(5);
            expect(
                fullVitalsBonus.sleepCycleBonus.convert(TimeUnit.hour).value,
            ).toEqual(12);
            expect(
                fullVitalsBonus.sleepTimeReduction.convert(TimeUnit.hour).value,
            ).toEqual(2);
        });
    });

    describe('Property accessors', () => {
        it('should return correct time value for sleepTimeReduction', () => {
            expect(
                fullVitalsBonus.sleepTimeReduction.convert(TimeUnit.hour).value,
            ).toEqual(2);
        });
        it('should return correct time value for sleepCycleBonus', () => {
            expect(
                fullVitalsBonus.sleepCycleBonus.convert(TimeUnit.hour).value,
            ).toEqual(12);
        });
        it('should return correct time value for breathHoldingTimeBonus', () => {
            expect(
                fullVitalsBonus.breathHoldingTimeBonus.convert(TimeUnit.second)
                    .value,
            ).toEqual(120);
        });
        it('should return correct time value for breathRecoveryTimeReduction', () => {
            expect(
                fullVitalsBonus.breathRecoveryTimeReduction.convert(
                    TimeUnit.second,
                ).value,
            ).toEqual(15);
        });
        it('should return correct maxHpBonus value', () => {
            expect(fullVitalsBonus.maxHpBonus).toEqual(10);
        });
        it('should return correct maxSanityBonus value', () => {
            expect(fullVitalsBonus.maxSanityBonus).toEqual(5);
        });
        it('should return correct isZero value', () => {
            expect(defaultVitalsBonus.isZero).toBeTruthy();
            expect(fullVitalsBonus.isZero).toBeFalsy();
        });
    });
    describe('export method', () => {
        it('should return the correct export object', () => {
            expect(defaultVitalsBonus.export()).toEqual({
                sleepTimeReduction: '0 hour',
                sleepCycleBonus: '0 hour',
                breathHoldingTimeBonus: '0 second',
                breathRecoveryTimeReduction: '0 second',
                maxHpBonus: 0,
                maxSanityBonus: 0,
            });
            expect(fullVitalsBonus.export()).toEqual({
                sleepTimeReduction: '2 hour',
                sleepCycleBonus: '12 hour',
                breathHoldingTimeBonus: '120 second',
                breathRecoveryTimeReduction: '15 second',
                maxHpBonus: 10,
                maxSanityBonus: 5,
            });
        });
    });
});
