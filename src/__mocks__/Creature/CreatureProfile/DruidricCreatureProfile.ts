import { type CreatureProfile } from '../../../Profile';
import { mockPersonalDetails } from './PersonalDetails';
import { mockDruidricClass } from '../Class';
import Race from '../../../Creature/Race';
import { MultiBonus } from '../../../Bonus';
import { type CharacterBaseInterface } from '../../../Character';
import { Inventory } from '../../../Item/Inventory';
import { mockedRaceRawAsset } from '../race';
import { mockBasicCreatureProfile } from './BasicCreatureProfile';


const mockDruidCreatureProfile: CreatureProfile = {
    ...mockBasicCreatureProfile,
    stats: {
        ...mockBasicCreatureProfile.stats,
        wisdom: 17,
    },
    progression: {
        ...mockBasicCreatureProfile.progression,
        level: 3,
        xp: 6000,
        classes: [
            {
                level: 3,
                class: mockDruidricClass,
            },
        ],
    },
};

const mockedDruidCharacter: CharacterBaseInterface = {
    baseProfile: mockDruidCreatureProfile,
    key: 'mocked-druid-profile',
    personal: mockPersonalDetails,
    overrides: [],
    race: new Race(mockedRaceRawAsset),
    classProgression: [
        {
            class: mockDruidricClass,
            level: 3,
        },
    ],
    inventory: new Inventory({}),
    totalBonuses: MultiBonus.zero,
    totalProfile: mockDruidCreatureProfile,
};

export {
    mockDruidCreatureProfile,
    mockedDruidCharacter,
};
