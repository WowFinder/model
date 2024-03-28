import { RawResistances } from '@wowfinder/asset-schemas';

const defaultResistancesBonusBuilder: Partial<RawResistances> = {} as const;

const resistancesBonusFullBuilder: RawResistances = {
    bludgeoning: 1,
    piercing: 2,
    slashing: 3,
    arcane: 4,
    cold: 5,
    fire: 6,
    nature: 7,
    holy: 8,
    shadow: 9,
    psychic: 10,
};

export { defaultResistancesBonusBuilder, resistancesBonusFullBuilder };
