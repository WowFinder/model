import { DamageTypes, FullDamageTypes } from '../../Damage/DamageType';

const mockMindBurnFullDamageTypes: FullDamageTypes = {
    bludgeoning: true,
    slashing: false,
    piercing: false,
    arcane: false,
    fire: true,
    cold: false,
    nature: false,
    shadow: false,
    holy: false,
    psychic: true,
};

const mockMindBurnPartialDamageTypes: DamageTypes = {
    bludgeoning: true,
    fire: true,
    cold: false,
    shadow: false,
    psychic: true,
};

export { mockMindBurnFullDamageTypes, mockMindBurnPartialDamageTypes };
