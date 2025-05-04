import { DamageType, Size, Skill } from '@wowfinder/ts-enums';
import { Shapes } from '../../../Item';
import { buildSpeedsProfile, type CreatureProfile } from '../../../Profile';
import { mockPersonalDetails } from './PersonalDetails';
import { mockMeleeClass } from '../Class';
import { mkCounter } from '@wowfinder/ts-utils';
import { Time } from '../../../Scalar';
import { fillSpellPowerValues, fullComputedSpellPower } from '../../../Magic';

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
    personalDetails: mockPersonalDetails,
    shape: Shapes.Humanoid,
    size: Size.medium,
    statsProfile: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    },
    progressionProfile: {
        level: 1,
        xp: 0,
        classes: [
            {
                level: 1,
                class: mockMeleeClass,
            },
        ],
    },
    speedsProfile: buildSpeedsProfile({
        baseSpeed: 30,
        encumberance: true,
    }),
    vitalsProfile: {
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
    skillsProfile: mapEnum(Skill, 0),
    savesProfile: {
        fortitude: 0,
        reflexes: 0,
        will: 0,
    },
    resistancesProfile: mapEnum(DamageType, 0),
    classFeaturesProfile: {},
    featsProfile: {},
    armorProfile: {
        armorClass: 10,
        touchArmorClass: 10,
        flatFootedArmorClass: 10,
        touchFlatFootedArmorClass: 10,
        combatManeuverDefense: 10,
    },
    baseAttackProfile: {
        meleeAttackBonus: 0,
        rangedAttackBonus: 0,
        touchAttackBonus: 0,
        rayAttackBonus: 0,
        combatManeuverBonus: 0,
    },
    spellPowerProfile: fullComputedSpellPower(fillSpellPowerValues({}, 0)),
};

export { mockBasicCreatureProfile };
