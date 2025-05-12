import { type Counter } from '@wowfinder/ts-utils';
import { days, hours, minutes, Time } from '../Scalar';

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

export { type VitalsProfile, defaultBreathProfile, defaultSleepProfile };
