import { type Counter, mkCounter } from '@wowfinder/ts-utils';
import { VitalsBonus } from '../../Bonus';
import {
    type VitalsProfile,
    addVitals,
    defaultBreathProfile,
    defaultSleepProfile,
} from '../VitalsProfile';
import { days, hours, minutes } from '../../Scalar';
import { TimeUnit } from '@wowfinder/ts-enums';

function mkHp(): Counter {
    return mkCounter({ max: 20, current: 10 });
}

function mkSanity(): Counter {
    return mkCounter({ max: 10, current: 5 });
}

function mkVitalsProfile({
    breath,
    sleep,
}: Pick<VitalsProfile, 'breath' | 'sleep'>): VitalsProfile {
    return {
        hp: mkHp(),
        sanity: mkSanity(),
        breath: breath,
        sleep: sleep,
    };
}

describe('VitalsProfile', () => {
    describe('addVitals', () => {
        it('should add vitals correctly to a minimal profile', () => {
            const base = mkVitalsProfile({});
            const bonuses = [
                new VitalsBonus({ maxHpBonus: 5 }),
                new VitalsBonus({ maxSanityBonus: 3 }),
            ];
            const result = addVitals(base, ...bonuses);
            expect(result.hp.current).toBe(15);
            expect(result.hp.max).toBe(25);
            expect(result.sanity.current).toBe(8);
            expect(result.sanity.max).toBe(13);
            expect(result.sleep).toBeDefined();
            expect(result.sleep).toEqual(defaultSleepProfile);
            expect(result.breath).toBeDefined();
            expect(result.breath).toEqual(defaultBreathProfile);
        });
        it('should correctly add complex profiles and bonuses', () => {
            const base = mkVitalsProfile({
                breath: {
                    breathHoldingTime: minutes(3),
                    breathRecoveryTime: minutes(2),
                },
                sleep: {
                    minimumSleepTime: hours(8),
                    optimalSleepTime: hours(8),
                    sleepCycle: days(1),
                },
            });
            const bonuses = [
                new VitalsBonus({ maxHpBonus: 5 }),
                new VitalsBonus({ maxSanityBonus: 3 }),
                new VitalsBonus({
                    maxHpBonus: 10,
                    sleepTimeReduction: hours(2),
                    sleepCycleBonus: hours(12),
                }),
                new VitalsBonus({
                    maxSanityBonus: 2,
                    breathHoldingTimeBonus: minutes(1),
                    breathRecoveryTimeReduction: minutes(1),
                }),
            ];
            const result = addVitals(base, ...bonuses);
            expect(result.hp.current).toBe(25);
            expect(result.hp.max).toBe(35);
            expect(result.sanity.current).toBe(10);
            expect(result.sanity.max).toBe(15);
            expect(result.sleep).toBeDefined();
            expect(
                result.sleep?.minimumSleepTime.convert(TimeUnit.hour).value,
            ).toEqual(6);
            expect(
                result.sleep?.optimalSleepTime.convert(TimeUnit.hour).value,
            ).toEqual(6);
            expect(
                result.sleep?.sleepCycle.convert(TimeUnit.hour).value,
            ).toEqual(36);
            expect(result.breath).toBeDefined();
            expect(
                result.breath?.breathHoldingTime.convert(TimeUnit.minute).value,
            ).toEqual(4);
            expect(
                result.breath?.breathRecoveryTime.convert(TimeUnit.minute)
                    .value,
            ).toEqual(1);
        });
    });
});
