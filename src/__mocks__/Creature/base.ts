import { RawCreatureAsset } from '@wowfinder/asset-schemas/dist/Creature/base';
import { baseDefault } from '../../Character/Stats';
import { Alignment } from '@wowfinder/ts-enums';

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
    },
    classes: [
        { class: 'mocked-melee-class', level: 8 },
        { class: 'mocked-arcane-class', level: 4 },
        { class: 'mocked-divine-class', level: 2 },
        { class: 'mocked-stealth-class', level: 2 },
    ],
} as const;

export { rawBaseCreatureMinimal, rawBaseCreatureExpanded };
