import { type RawVitals } from '../../Bonus/VitalsBonus';

const vitalsBonusDefaultBuilder: RawVitals = {} as const;

const vitalsBonusFullBuilder: Required<RawVitals> = {
    sleepTimeReduction: '2h',
    sleepCycleBonus: '12h',
    breathHoldingTimeBonus: '120s',
    breathRecoveryTimeReduction: '15s',
    maxHpBonus: 10,
    maxSanityBonus: 5,
};

export { vitalsBonusDefaultBuilder, vitalsBonusFullBuilder };
