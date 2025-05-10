import type { RawSpeeds } from '@wowfinder/asset-schemas';

// https://github.com/WowFinder/model/issues/209
type SpeedKeys = keyof Omit<RawSpeeds, 'maneuverability'>;

// https://github.com/WowFinder/model/issues/209
type SpeedsModifiers = Record<SpeedKeys, number>;

export type { SpeedsModifiers, SpeedKeys };
