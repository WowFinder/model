import {
    ArmorValuesBuilder,
    FullArmorValuesBuilder,
} from '../../Creature/ArmorValues/builder';

const mockArmorValuesBuilder: ArmorValuesBuilder = {
    gear: 1,
    natural: 2,
    deflection: 3,
    misc: 4,
    miscPhysical: 5,
    miscEvasion: 6,
    temporary: 7,
    temporaryPhysical: 8,
    temporaryEvasion: 9,
} as const;

const mockFullArmorValuesBuilder: FullArmorValuesBuilder = {
    ...mockArmorValuesBuilder,
    strength: -1,
    dexterity: -2,
    baseAttack: +12,
    size: -3,
} as const;

const expectedTotalsForArmorValuesMocks = {
    total: 10 + 1 + 2 + 3 + 4 + 5 - 2 + -3 + 6 + 7 + 8 + 9,
    flatFooted: 10 + 1 + 2 + 3 + 4 + 5 + -3 + 7 + 8,
    touch: 10 + 3 + 4 + 6 + 7 + 9 - 2 - 3,
    maneuverDefense: 10 + 12 - 1 - 2 - 3 + 3 + 4 + 6 + 7 + 9,
    maneuverDefenseFlatFooted: 10 + 12 - 1 - 3 + 4 + 7,
} as const;

export {
    mockArmorValuesBuilder,
    mockFullArmorValuesBuilder,
    expectedTotalsForArmorValuesMocks,
};
