import type { Counter } from '@wowfinder/ts-utils';
import { Time } from '../Scalar';
import { TimeUnit } from '@wowfinder/ts-enums';

type SleepProfile = {
    minimumSleepTime: Time;
    optimalSleepTime: Time;
    sleepCycle: Time;
};

function hours(value: number): Time {
    return new Time({
        value,
        unit: TimeUnit.hour,
    });
}
function minutes(value: number): Time {
    return new Time({
        value,
        unit: TimeUnit.minute,
    });
}

const defaultSleepProfile: SleepProfile = {
    minimumSleepTime: hours(4),
    optimalSleepTime: hours(8),
    sleepCycle: hours(24),
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

export { type VitalsProfile, defaultBreathProfile, defaultSleepProfile };
