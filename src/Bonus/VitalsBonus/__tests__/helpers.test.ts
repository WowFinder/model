import { addVitalBonus, maxVitalsBonus, multiplyVitalsBonus } from '../helpers';

import { VitalsBonus } from '../VitalsBonus';

import {
    vitalsBonusDefaultBuilder,
    vitalsBonusFullBuilder,
} from '../../../__mocks__/Bonus/VitalsBonusBuilders';
import { TimeUnit } from '@wowfinder/ts-enums';

describe('VitalsBonus helpers', () => {
    let defaultVitalsBonus: VitalsBonus;
    let fullVitalsBonus: VitalsBonus;

    beforeEach(() => {
        defaultVitalsBonus = VitalsBonus.build(vitalsBonusDefaultBuilder);
        fullVitalsBonus = VitalsBonus.build(vitalsBonusFullBuilder);
    });
    describe('addVitalBonus', () => {
        it('should return a VitalsBonusBuilder with all values set to 0', () => {
            const result = addVitalBonus(defaultVitalsBonus);
            expect(result.sleepTimeReduction?.isZero).toBeTruthy();
            expect(result.sleepCycleBonus?.isZero).toBeTruthy();
            expect(result.breathHoldingTimeBonus?.isZero).toBeTruthy();
            expect(result.breathRecoveryTimeReduction?.isZero).toBeTruthy();
            expect(result.maxHpBonus).toBe(0);
            expect(result.maxSanityBonus).toBe(0);
        });

        it('should return a VitalsBonusBuilder with all values set to the sum of the input values', () => {
            const result = addVitalBonus(fullVitalsBonus, fullVitalsBonus);
            expect(
                result.sleepTimeReduction.convert(TimeUnit.hour).value,
            ).toEqual(4);
            expect(result.sleepCycleBonus.convert(TimeUnit.hour).value).toEqual(
                24,
            );
            expect(
                result.breathHoldingTimeBonus.convert(TimeUnit.second).value,
            ).toEqual(240);
            expect(
                result.breathRecoveryTimeReduction.convert(TimeUnit.second)
                    .value,
            ).toEqual(30);
            expect(result.maxHpBonus).toEqual(20);
            expect(result.maxSanityBonus).toEqual(10);
        });
    });

    describe('maxVitalsBonus', () => {
        it('should return a VitalsBonusBuilder with all values set to the maximum of the input values', () => {
            const result = new VitalsBonus(
                maxVitalsBonus(fullVitalsBonus, defaultVitalsBonus),
            );
            expect(result.export()).toEqual(fullVitalsBonus.export());
        });
    });

    describe('multiplyVitalsBonus', () => {
        it('should return a VitalsBonusBuilder with all values multiplied by the given multiplier', () => {
            const result = new VitalsBonus(
                multiplyVitalsBonus(fullVitalsBonus, 3),
            ).export();
            const tripleSum = new VitalsBonus(
                addVitalBonus(
                    fullVitalsBonus,
                    fullVitalsBonus,
                    fullVitalsBonus,
                ),
            ).export();
            expect(result).toEqual(tripleSum);
        });
    });
});
