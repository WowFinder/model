import { type Counter } from '@wowfinder/ts-utils';
import { days, hours, minutes, Time } from '../Scalar';
import { VitalsBonus } from '../Bonus';

type SleepProfile = {
    minimumSleepTime: Time;
    optimalSleepTime: Time;
    sleepCycle: Time;
};

const defaultSleepProfile: SleepProfile = {
    minimumSleepTime: hours(4),
    optimalSleepTime: hours(8),
    sleepCycle: days(1),
};

type BreathProfile = {
    breathHoldingTime: Time;
    breathRecoveryTime: Time;
    // TODO breathMediums
};

const defaultBreathProfile: BreathProfile = {
    breathHoldingTime: minutes(1),
    breathRecoveryTime: minutes(5),
};

type VitalsProfile = {
    hp: Counter;
    sanity: Counter;
    sleep?: SleepProfile;
    breath?: BreathProfile;
};

function addVitals(
    base: VitalsProfile,
    ...bonuses: VitalsBonus[]
): VitalsProfile {
    const totalBonuses = VitalsBonus.sum(...bonuses);
    const hp = {
        ...base.hp,
        current: base.hp.current + totalBonuses.maxHpBonus,
        max: base.hp.max + totalBonuses.maxHpBonus,
    };
    const sanity = {
        ...base.sanity,
        current: base.sanity.current + totalBonuses.maxSanityBonus,
        max: base.sanity.max + totalBonuses.maxSanityBonus,
    };
    const baseSleep = base.sleep ?? defaultSleepProfile;
    const baseBreath = base.breath ?? defaultBreathProfile;
    return {
        hp,
        sanity,
        sleep: {
            minimumSleepTime: Time.add(
                baseSleep.minimumSleepTime.unit,
                baseSleep.minimumSleepTime,
                totalBonuses.sleepTimeReduction.negative,
            ),
            optimalSleepTime: Time.add(
                baseSleep.optimalSleepTime.unit,
                baseSleep.optimalSleepTime,
                totalBonuses.sleepTimeReduction.negative,
            ),
            sleepCycle: Time.add(
                baseSleep.sleepCycle.unit,
                baseSleep.sleepCycle,
                totalBonuses.sleepCycleBonus,
            ),
        },
        breath: {
            breathHoldingTime: Time.add(
                baseBreath.breathHoldingTime.unit,
                baseBreath.breathHoldingTime,
                totalBonuses.breathHoldingTimeBonus,
            ),
            breathRecoveryTime: Time.add(
                baseBreath.breathRecoveryTime.unit,
                baseBreath.breathRecoveryTime,
                totalBonuses.breathRecoveryTimeReduction.negative,
            ),
        },
    };
}

export {
    type VitalsProfile,
    defaultBreathProfile,
    defaultSleepProfile,
    addVitals,
};
