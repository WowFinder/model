import { type RawVitals } from '@wowfinder/asset-schemas';

const vitalsBonusDefaultBuilder: Partial<RawVitals> = {} as const;

const vitalsBonusFullBuilder: RawVitals = {
    sleepTimeReduction: '2h',
    sleepCycleBonus: '12h',
    breathHoldingTimeBonus: '120s',
    breathRecoveryTimeReduction: '15s',
    maxHpBonus: 10,
    maxSanityBonus: 5,
};

export { vitalsBonusDefaultBuilder, vitalsBonusFullBuilder };
