import { TimeUnit } from '@wowfinder/ts-enums';
import { sum } from '@wowfinder/ts-utils';
import { type VitalsBonus, type VitalsBonusBuilder } from './VitalsBonus';
import { Time } from '../../Scalar';
import { type RawVitals } from '@wowfinder/asset-schemas';

function addVitalBonus(...args: VitalsBonus[]): Required<VitalsBonusBuilder> {
    if (args.length === 0) {
        return {
            sleepTimeReduction: Time.zero,
            sleepCycleBonus: Time.zero,
            breathHoldingTimeBonus: Time.zero,
            breathRecoveryTimeReduction: Time.zero,
            maxHpBonus: 0,
            maxSanityBonus: 0,
        };
    }
    return {
        sleepTimeReduction: Time.add(
            TimeUnit.hour,
            ...args.map(b => b.sleepTimeReduction),
        ),
        sleepCycleBonus: Time.add(
            TimeUnit.hour,
            ...args.map(b => b.sleepCycleBonus),
        ),
        breathHoldingTimeBonus: Time.add(
            TimeUnit.second,
            ...args.map(b => b.breathHoldingTimeBonus),
        ),
        breathRecoveryTimeReduction: Time.add(
            TimeUnit.second,
            ...args.map(b => b.breathRecoveryTimeReduction),
        ),
        maxHpBonus: sum(...args.map(b => b.maxHpBonus)),
        maxSanityBonus: sum(...args.map(b => b.maxSanityBonus)),
    };
}

function maxVitalsBonus(...args: VitalsBonus[]): VitalsBonusBuilder {
    return {
        sleepTimeReduction: Time.max(
            ...args.map(b => b.sleepTimeReduction).filter(t => !t.isZero),
        ),
        sleepCycleBonus: Time.max(
            ...args.map(b => b.sleepCycleBonus).filter(t => !t.isZero),
        ),
        breathHoldingTimeBonus: Time.max(
            ...args.map(b => b.breathHoldingTimeBonus).filter(t => !t.isZero),
        ),
        breathRecoveryTimeReduction: Time.max(
            ...args
                .map(b => b.breathRecoveryTimeReduction)
                .filter(t => !t.isZero),
        ),
        maxHpBonus: Math.max(
            ...args.map(b => b.maxHpBonus).filter(val => !!val),
        ),
        maxSanityBonus: Math.max(
            ...args.map(b => b.maxSanityBonus).filter(val => !!val),
        ),
    };
}

function multiplyVitalsBonus(
    vitalsBonus: VitalsBonus,
    multiplier: number,
): VitalsBonusBuilder {
    return {
        sleepTimeReduction: Time.multiply(
            vitalsBonus.sleepTimeReduction,
            multiplier,
        ),
        sleepCycleBonus: Time.multiply(vitalsBonus.sleepCycleBonus, multiplier),
        breathHoldingTimeBonus: Time.multiply(
            vitalsBonus.breathHoldingTimeBonus,
            multiplier,
        ),
        breathRecoveryTimeReduction: Time.multiply(
            vitalsBonus.breathRecoveryTimeReduction,
            multiplier,
        ),
        maxHpBonus: Math.floor(vitalsBonus.maxHpBonus * multiplier),
        maxSanityBonus: Math.floor(vitalsBonus.maxSanityBonus * multiplier),
    };
}

function buildVitalsBonusArgs(raw: Partial<RawVitals>): VitalsBonusBuilder {
    return {
        sleepTimeReduction: Time.parseTime(raw.sleepTimeReduction ?? '0h'),
        sleepCycleBonus: Time.parseTime(raw.sleepCycleBonus ?? '0h'),
        breathHoldingTimeBonus: Time.parseTime(
            raw.breathHoldingTimeBonus ?? '0s',
        ),
        breathRecoveryTimeReduction: Time.parseTime(
            raw.breathRecoveryTimeReduction ?? '0s',
        ),
        maxHpBonus: raw.maxHpBonus ?? 0,
        maxSanityBonus: raw.maxSanityBonus ?? 0,
    };
}

export {
    addVitalBonus,
    maxVitalsBonus,
    multiplyVitalsBonus,
    buildVitalsBonusArgs,
};
