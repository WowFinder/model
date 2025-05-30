import { DamageType, Size, Skill } from '@wowfinder/ts-enums';
import { Shapes } from '../../../Item';
import { type CreatureProfile, SpeedsProfile } from '../../../Profile';
import { mockPersonalDetails } from './PersonalDetails';
import { mockDruidricClass, mockMeleeClass } from '../Class';
import { mkCounter } from '@wowfinder/ts-utils';
import { Time } from '../../../Scalar';
import { fillSpellPowerValues, fullComputedSpellPower } from '../../../Magic';
import Race from '../../../Creature/Race';
import { MultiBonus } from '../../../Bonus';
import { type CharacterBaseInterface } from '../../../Character';
import { Inventory } from '../../../Item/Inventory';
import { mockedRaceRawAsset } from '../race';

function mapEnum<TEnum extends string, TValue>(
    enumObj: Record<TEnum, TEnum>,
    value: TValue,
): Record<TEnum, TValue> {
    return Object.keys(enumObj).reduce(
        (acc, key) => {
            acc[key as TEnum] = value;
            return acc;
        },
        {} as Record<TEnum, TValue>,
    );
}

const mockBasicCreatureProfile: CreatureProfile = {
    personal: mockPersonalDetails,
    shape: Shapes.Humanoid,
    size: Size.medium,
    stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    },
    progression: {
        level: 1,
        xp: 0,
        classes: [
            {
                level: 1,
                class: mockMeleeClass,
            },
        ],
    },
    speeds: new SpeedsProfile({
        base: 30,
        encumberance: true,
    }),
    vitals: {
        hp: mkCounter({ max: 10 }),
        sanity: mkCounter({ max: 0 }),
        sleep: {
            minimumSleepTime: Time.parseTime('4h'),
            optimalSleepTime: Time.parseTime('8h'),
            sleepCycle: Time.parseTime('24h'),
        },
        breath: {
            breathHoldingTime: Time.parseTime('1m'),
            breathRecoveryTime: Time.parseTime('1m'),
        },
    },
    skills: mapEnum(Skill, 0),
    saves: {
        fortitude: 0,
        reflexes: 0,
        will: 0,
    },
    resistances: mapEnum(DamageType, 0),
    features: {},
    feats: {},
    armor: {
        armorClass: 10,
        touchArmorClass: 10,
        flatFootedArmorClass: 10,
        touchFlatFootedArmorClass: 10,
        combatManeuverDefense: 10,
    },
    attack: {
        meleeAttackBonus: 0,
        rangedAttackBonus: 0,
        touchAttackBonus: 0,
        rayAttackBonus: 0,
        combatManeuverBonus: 0,
    },
    spellPower: fullComputedSpellPower(fillSpellPowerValues({}, 0)),
    traits: [],
};

const mockDruidCreatureProfile: CreatureProfile = {
    ...mockBasicCreatureProfile,
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
    mockBasicCreatureProfile,
    mockDruidCreatureProfile,
    mockedDruidCharacter,
};
