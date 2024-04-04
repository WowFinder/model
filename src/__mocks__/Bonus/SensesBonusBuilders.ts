import { SensesBonusBuilder } from 'Bonus';

const sensesBonusDefaultBuilder: SensesBonusBuilder = {} as const;

const sensesBonusFullBuilder: Required<SensesBonusBuilder> = {
    darkVision: 1,
    lowLightVision: true,
    smell: true,
};

export { sensesBonusDefaultBuilder, sensesBonusFullBuilder };
