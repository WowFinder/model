import {
    Elixir,
    Food,
    GearEnchant,
    Potion,
    SharpeningStone,
    WeaponOil,
    WeightStone,
} from './Craftable';

// TODO: proper typing (requires raw types in @wowfinder/asset-schemas)
const consumableBuilderByTypeKey: { [key: string]: any } = {
    Potion: Potion.build,
    Elixir: Elixir.build,
    SharpeningStone: SharpeningStone.build,
    WeightStone: WeightStone.build,
    GearEnchant: GearEnchant.build,
    WeaponOil: WeaponOil.build,
    Food: Food.build,
} as const;

export { consumableBuilderByTypeKey };
