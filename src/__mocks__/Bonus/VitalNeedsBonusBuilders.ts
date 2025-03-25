import { VitalNeedsBonusBuilder } from '../../Bonus';

const vitalNeedsBonusDefaultBuilder: VitalNeedsBonusBuilder = {} as const;

const vitalNeedsBonusFullBuilder: Required<VitalNeedsBonusBuilder> = {
    breathe: false,
    eat: false,
    sleep: false,
};

export { vitalNeedsBonusDefaultBuilder, vitalNeedsBonusFullBuilder };
