import { type CreatureProfile } from '../../../Profile';
import { mockPersonalDetails } from './PersonalDetails';
import { mockMeleeClass } from '../Class';
import Race from '../../../Creature/Race';
import { MultiBonus } from '../../../Bonus';
import { type CharacterBaseInterface } from '../../../Character';
import { Inventory } from '../../../Item/Inventory';
import { mockedRaceRawAsset } from '../race';
import { mockBasicCreatureProfile } from './BasicCreatureProfile';

const mockBruteCreatureProfile: CreatureProfile = {
    ...mockBasicCreatureProfile,
    stats: {
        ...mockBasicCreatureProfile.stats,
        strength: 15,
        constitution: 14,
    },
    progression: {
        ...mockBasicCreatureProfile.progression,
        level: 3,
        xp: 6000,
        classes: [
            {
                level: 3,
                class: mockMeleeClass,
            },
        ],
    },
    feats: {
        diehard: 1,
        toughness: 1,
    },
};

const mockedBruteCharacter: CharacterBaseInterface = {
    baseProfile: mockBruteCreatureProfile,
    key: 'mocked-brute-profile',
    personal: mockPersonalDetails,
    overrides: [],
    race: new Race(mockedRaceRawAsset),
    classProgression: [
        {
            class: mockMeleeClass,
            level: 3,
        },
    ],
    inventory: new Inventory({}),
    totalBonuses: MultiBonus.zero,
    totalProfile: mockBruteCreatureProfile,
};

export { mockBruteCreatureProfile, mockedBruteCharacter };
