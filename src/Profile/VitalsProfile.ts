import type { Counter } from '@wowfinder/ts-utils';
import type { Time } from '../Scalar';

type SleepProfile = {
    minimumSleepTime: Time;
    optimalSleepTime: Time;
    sleepCycle: Time;
};

type BreathProfile = {
    breathHoldingTime: Time;
    breathRecoveryTime: Time;
    // TODO breathMediums
};

type VitalsProfile = {
    hp: Counter;
    sanity: Counter;
    sleep?: SleepProfile;
    breath?: BreathProfile;
};

export type { VitalsProfile };
