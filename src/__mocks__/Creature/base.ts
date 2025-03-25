import { RawCreatureAsset } from '@wowfinder/asset-schemas/Creature/base';
import { Alignment, Skill } from '@wowfinder/ts-enums';
import { baseDefault } from '../../Creature/Stats';

const rawBaseCreatureMinimal: RawCreatureAsset = {
    key: 'base-creature-mock-minimal',
    baseStats: { ...baseDefault },
    race: 'night-elf',
    personal: {
        fullName: 'Minimal Base Creature Mock',
    },
} as const;

const rawBaseCreatureExpanded: RawCreatureAsset = {
    ...rawBaseCreatureMinimal,
    key: 'base-creature-mock-expanded',
    personal: {
        ...rawBaseCreatureMinimal.personal,
        alignment: Alignment.lawfulGood,
        weight: 180,
    } as const,
    notes: 'This is a mock creature for testing purposes.',
    classes: [
        { class: 'mocked-melee-class', level: 8 },
        { class: 'mocked-arcane-class', level: 4 },
        { class: 'mocked-divine-class', level: 2 },
        { class: 'mocked-stealth-class', level: 2 },
    ] as const,
} as const;

const rawBaseCreatureFull: RawCreatureAsset = {
    ...rawBaseCreatureExpanded,
    key: 'base-creature-mock-full',
    personal: {
        alignment: Alignment.lawfulGood,
        fullName: 'Full Base Creature Mock',
        faith: 'Mocked Deity',
        origin: 'Mocked Place',
        hair: 'Mocked Hair',
        eyes: 'Mocked Eyes',
        skin: 'Mocked Skin',
        gender: 'Mocked gender',
        height: 72,
        weight: 180,
        age: 25,
    },
    notes: 'This is a mock creature for testing purposes.',
    classes: [
        { class: 'mocked-melee-class', level: 8 },
        { class: 'mocked-arcane-class', level: 4 },
        { class: 'mocked-divine-class', level: 2 },
        { class: 'mocked-stealth-class', level: 2 },
    ] as const,
    skillRanks: {
        [Skill.acrobatics]: 4,
        [Skill.arcane]: 2,
        [Skill.stealth]: 2,
    } as const,
    templates: [] as const,
    feats: [] as const,
    inventory: {
        money: 10000,
        gear: [],
        carried: [],
    } as const,
} as const;

export { rawBaseCreatureExpanded, rawBaseCreatureFull, rawBaseCreatureMinimal };
