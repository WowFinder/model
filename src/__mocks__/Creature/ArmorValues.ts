import {
    ArmorValuesBuilder,
    FullArmorValuesBuilder,
} from '../../Creature/ArmorValues/builder';

const mockArmorValuesBuilder: ArmorValuesBuilder = {
    armor: 1,
    shield: 2,
    dodge: 3,
    natural: 4,
    deflection: 5,
    misc: 6,
    miscPhysical: 7,
    miscEvasion: 8,
    temporary: 9,
    temporaryPhysical: 10,
    temporaryEvasion: 11,
} as const;

const mockFullArmorValuesBuilder: FullArmorValuesBuilder = {
    ...mockArmorValuesBuilder,
    strength: -1,
    dexterity: -2,
    baseAttack: +12,
    size: -3,
} as const;

const expectedTotalsForArmorValuesMocks = {
    total: 10 + 1 + 2 + 4 + 3 + 5 - 2 + -3 + 6 + 7 + 8 + 9 + 10 + 11,
    flatFooted: 10 + 1 + 2 + 4 + 5 + -3 + 6 + 7 + 9 + 10,
    touch: 10 + 3 + 5 - 2 + -3 + 6 + 8 + 9 + 11,
    maneuverDefense: 10 + 12 - 1 - 2 - 3 + 3 + 5 + 6 + 8 + 9 + 11,
    maneuverDefenseFlatFooted: 10 + 12 - 1 - 3 + 6 + 9,
} as const;

export {
    mockArmorValuesBuilder,
    mockFullArmorValuesBuilder,
    expectedTotalsForArmorValuesMocks,
};
