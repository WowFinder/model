import { Size, Skill, DamageType } from '@wowfinder/ts-enums';
import { mkCounter } from '@wowfinder/ts-utils';
import { Shapes } from '../../../Item';
import { fullComputedSpellPower, fillSpellPowerValues } from '../../../Magic';
import { CreatureProfile, SpeedsProfile } from '../../../Profile';
import { Time } from '../../../Scalar';
import { mockMeleeClass } from '../Class';
import { mapEnum } from './helpers';
import { mockPersonalDetails } from './PersonalDetails';

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

export { mockBasicCreatureProfile };
