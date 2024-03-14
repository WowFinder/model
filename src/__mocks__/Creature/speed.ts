import { FlyManeuverability } from '@wowfinder/ts-enums';
import type { SpeedBuilder } from '../../Creature/Speeds';
const mockedSpeedSimpleRawAsset: SpeedBuilder = {
    base: 30,
};

const mockedSpeedCustomRawAsset: SpeedBuilder = {
    base: 30,
    fly: 60,
    swim: 20,
    burrow: 10,
    climb: 15,
    encumberance: false,
    maneuverability: FlyManeuverability.good,
};

const mockedSpeedSlowRawAsset: SpeedBuilder = {
    base: 15,
};

const mockedSpeedNegativeRawAsset: SpeedBuilder = {
    base: -15,
};

export {
    mockedSpeedSimpleRawAsset,
    mockedSpeedCustomRawAsset,
    mockedSpeedSlowRawAsset,
    mockedSpeedNegativeRawAsset,
};
