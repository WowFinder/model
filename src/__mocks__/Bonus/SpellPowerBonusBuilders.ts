import type {
    ModeSpellPowerBonusBuilder,
    SchoolSpellPowerBonusBuilder,
    SubSchoolSpellPowerBonusBuilder,
} from '../../Bonus';

const defaultBuilder = {} as const;

const modeDefaultBuilder: ModeSpellPowerBonusBuilder = defaultBuilder;

const modeFullBuilder: Required<ModeSpellPowerBonusBuilder> = {
    arcane: 1,
    divine: 2,
    spontaneous: 3,
};

const schoolDefaultBuilder: SchoolSpellPowerBonusBuilder = defaultBuilder;

const schoolFullBuilder: SchoolSpellPowerBonusBuilder = {
    abjuration: 1,
    conjuration: 2,
    divination: 3,
    enchantment: 4,
    evocation: 5,
    illusion: 6,
    necromancy: 7,
    transmutation: 8,
    universal: 9,
};

const subSchoolDefaultBuilder: SubSchoolSpellPowerBonusBuilder = defaultBuilder;

const subSchoolFullBuilder: Required<SubSchoolSpellPowerBonusBuilder> = {
    void: 1,
    banish: 2,
    counter: 3,
    call: 4,
    celestial: 5,
    create: 6,
    heal: 7,
    summon: 8,
    teleport: 9,
    scry: 10,
    charm: 11,
    compel: 12,
    figment: 13,
    glamer: 14,
    phantom: 15,
    shadow: 16,
    enhancement: 17,
    polymorph: 18,
};

export {
    modeDefaultBuilder,
    modeFullBuilder,
    schoolDefaultBuilder,
    schoolFullBuilder,
    subSchoolDefaultBuilder,
    subSchoolFullBuilder,
};
