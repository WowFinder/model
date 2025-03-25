import { RawResistances } from '@wowfinder/asset-schemas';
import { BonusType } from '@wowfinder/ts-enums';

type FullResistances = {
    [key in keyof BonusType]: RawResistances;
};

export type { FullResistances };
