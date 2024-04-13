import type { Counter } from '@wowfinder/ts-utils';
import type { Time } from '../Scalar';

interface SleepProfile {
    minimumSleepTime: Time;
    optimalSleepTime: Time;
    sleepCycle: Time;
}

interface BreathProfile {
    breathHoldingTime: Time;
    breathRecoveryTime: Time;
    // TODO breathMediums
}

interface VitalsProfile {
    hp: Counter;
    sanity: Counter;
    sleep?: SleepProfile;
    breath?: BreathProfile;
}

export type { VitalsProfile };
