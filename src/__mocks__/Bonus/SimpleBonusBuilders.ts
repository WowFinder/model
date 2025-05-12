import { SimpleBonusBuilder } from '../../Bonus/SimpleBonus.builder';
import { mixedBonusStatsMock } from '../Creature/Stats';
import { skillsBonusFullBuilder } from './SkillsBonusBuilders';
import { resistancesBonusFullBuilder } from './ResistancesBonusBuilders';
import { vitalsBonusFullBuilder } from './VitalsBonusBuilders';
import { sensesBonusFullBuilder } from './SensesBonusBuilders';
import {
    modeFullBuilder,
    schoolFullBuilder,
    subSchoolFullBuilder,
} from './SpellPowerBonusBuilders';
import {
    mixedCasterFeatsBonusBuilder,
    mixedMartialFeatsBonusBuilder,
} from './FeatsBonusBuilders';
import {
    fullBaseSpeedsBonusBuilder,
    fullSpeedsModifiersBonusBuilder,
} from './SpeedsBonusBuilders';

const defaultSimpleBonusBuilder: SimpleBonusBuilder = {};

const fullSimpleBonusBuilder: SimpleBonusBuilder = {
    hp: 10,
    armorClass: 2,
    stats: mixedBonusStatsMock,
    skills: skillsBonusFullBuilder,
    resistances: resistancesBonusFullBuilder,
    vitals: vitalsBonusFullBuilder,
    senses: sensesBonusFullBuilder,
    spellPower: {
        ...modeFullBuilder,
        ...schoolFullBuilder,
        ...subSchoolFullBuilder,
    },
    feats: [...mixedMartialFeatsBonusBuilder, ...mixedCasterFeatsBonusBuilder],
    baseSpeeds: fullBaseSpeedsBonusBuilder,
    speedsModifiers: fullSpeedsModifiersBonusBuilder,
};

export { defaultSimpleBonusBuilder, fullSimpleBonusBuilder };
