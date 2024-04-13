import { RawSpeeds } from '@wowfinder/asset-schemas';
import { FlyManeuverability } from '@wowfinder/ts-enums';
import { SpeedsModifiersBonusBuilder } from '../../Bonus/SpeedsBonus';

const emptyBaseSpeedsBonusBuilder: Partial<RawSpeeds> = {};

const defaultSpeedsModifiersBonusBuilder: SpeedsModifiersBonusBuilder = {};

const defaultBaseSpeedsBonusBuilder: RawSpeeds = {
    base: 30,
};

const fullSpeedsModifiersBonusBuilder: SpeedsModifiersBonusBuilder = {
    base: 5,
    burrow: 10,
    climb: 15,
    swim: 20,
    fly: 25,
};

const fullBaseSpeedsBonusBuilder: Required<RawSpeeds> = {
    base: 35,
    burrow: 40,
    climb: 45,
    swim: 50,
    fly: 55,
    maneuverability: FlyManeuverability.perfect,
};

export {
    emptyBaseSpeedsBonusBuilder,
    defaultSpeedsModifiersBonusBuilder,
    defaultBaseSpeedsBonusBuilder,
    fullSpeedsModifiersBonusBuilder,
    fullBaseSpeedsBonusBuilder,
};
