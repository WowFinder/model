import { type RawResistances } from '@wowfinder/asset-schemas';
import {
    type PhysicalDamageType,
    type EnergyType,
    type SpecialDamageType,
} from '@wowfinder/ts-enums';

function fillPhysicalResistances(
    data: Partial<RawResistances>,
    filler = 0,
): Record<PhysicalDamageType, number> {
    return {
        bludgeoning: data.bludgeoning ?? filler,
        slashing: data.slashing ?? filler,
        piercing: data.piercing ?? filler,
    };
}

function fillEnergyResistances(
    data: Partial<RawResistances>,
    filler = 0,
): Record<EnergyType, number> {
    return {
        arcane: data.arcane ?? filler,
        fire: data.fire ?? filler,
        cold: data.cold ?? filler,
        nature: data.nature ?? filler,
        shadow: data.shadow ?? filler,
        holy: data.holy ?? filler,
    };
}

function fillSpecialResistances(
    data: Partial<RawResistances>,
    filler = 0,
): Record<SpecialDamageType, number> {
    return {
        psychic: data.psychic ?? filler,
    };
}

function fillResistances(
    data: Partial<RawResistances>,
    filler = 0,
): RawResistances {
    return {
        ...fillPhysicalResistances(data, filler),
        ...fillEnergyResistances(data, filler),
        ...fillSpecialResistances(data, filler),
    };
}

export {
    fillResistances,
    fillPhysicalResistances,
    fillEnergyResistances,
    fillSpecialResistances,
};
