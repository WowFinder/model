import type { RawSpeeds } from '@wowfinder/asset-schemas';

// TODO: move to @wowfinder/ts-enums
type SpeedKeys = keyof Omit<RawSpeeds, 'maneuverability'>;

// TODO: move somewhere?
type SpeedsModifiers = Record<SpeedKeys, number>;

export type { SpeedsModifiers, SpeedKeys };
