import { RawResistances } from '@wowfinder/asset-schemas';
import { DamageType } from '@wowfinder/ts-enums';
import { FullResistances } from '../../Creature';

const mockZeroResistances: RawResistances = {
    bludgeoning: 0,
    slashing: 0,
    piercing: 0,
    arcane: 0,
    fire: 0,
    cold: 0,
    nature: 0,
    shadow: 0,
    holy: 0,
    psychic: 0,
};

const mockDifferentResistances: RawResistances = {
    bludgeoning: 1,
    slashing: 2,
    piercing: 3,
    arcane: 4,
    fire: 5,
    cold: 6,
    nature: 7,
    shadow: 8,
    holy: 9,
    psychic: 10,
};

const mockMultipleResistances = (
    base: RawResistances,
    factor?: number,
): RawResistances => {
    const multiplier = factor ?? Object.keys(DamageType).length;
    return {
        bludgeoning: base.bludgeoning * multiplier,
        slashing: base.slashing * multiplier,
        piercing: base.piercing * multiplier,
        arcane: base.arcane * multiplier,
        fire: base.fire * multiplier,
        cold: base.cold * multiplier,
        nature: base.nature * multiplier,
        shadow: base.shadow * multiplier,
        holy: base.holy * multiplier,
        psychic: base.psychic * multiplier,
    };
};

const mockDifferentFullResistances: FullResistances = {
    gear: mockDifferentResistances,
    enhancement: mockDifferentResistances,
    deflection: mockDifferentResistances,
    natural: mockDifferentResistances,
    temporal: mockDifferentResistances,
    aura: mockDifferentResistances,
};

export {
    mockZeroResistances,
    mockDifferentResistances,
    mockDifferentFullResistances,
    mockMultipleResistances,
};
