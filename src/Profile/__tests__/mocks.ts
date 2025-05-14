import { Stat, Skill } from '@wowfinder/ts-enums';
import {
    StatsBonus,
    SkillsBonus,
    SavesBonus,
    ResistancesBonus,
    FeatsBonus,
    SpeedsModifiersBonus,
} from '../../Bonus';
import { fillSkills } from '../../Creature/Skill/Skills';
import { fillResistances } from '../../Creature/Resistances/fill';
import { Feat } from '../../Creature/Feats';
import { SpeedsProfile } from '../SpeedsProfile';
import { Counter, mkCounter } from '@wowfinder/ts-utils';
import { VitalsProfile } from '../VitalsProfile';

const baseStats = {
    [Stat.strength]: 10,
    [Stat.dexterity]: 12,
    [Stat.constitution]: 14,
    [Stat.intelligence]: 16,
    [Stat.wisdom]: 18,
    [Stat.charisma]: 20,
};

const statBonus1 = new StatsBonus({
    [Stat.strength]: 2,
    [Stat.dexterity]: 3,
});

const statBonus2 = new StatsBonus({
    [Stat.constitution]: 4,
    [Stat.intelligence]: 5,
});

const combinedStats = {
    [Stat.strength]: 12,
    [Stat.dexterity]: 15,
    [Stat.constitution]: 18,
    [Stat.intelligence]: 21,
    [Stat.wisdom]: 18,
    [Stat.charisma]: 20,
};

const baseSpeeds = new SpeedsProfile({
    base: 30,
    dexBonus: 2,
    otherInitiativeModifiers: [1, 3],
});

const swimSpeedBonus = new SpeedsModifiersBonus({
    swim: 10,
});

const multipleSpeedsBonus = new SpeedsModifiersBonus({
    base: 10,
    swim: 20,
    fly: 20,
});

const combinedSpeeds = new SpeedsProfile({
    base: 40,
    dexBonus: 2,
    otherInitiativeModifiers: [1, 3],
    swim: 30,
    fly: 20,
});

function mkHp(): Counter {
    return mkCounter({ max: 20, current: 10 });
}

function mkSanity(): Counter {
    return mkCounter({ max: 10, current: 5 });
}

function mkVitalsProfile({
    breath,
    sleep,
}: Pick<VitalsProfile, 'breath' | 'sleep'>): VitalsProfile {
    return {
        hp: mkHp(),
        sanity: mkSanity(),
        breath: breath,
        sleep: sleep,
    };
}

const baseSkills = fillSkills({
    [Skill.acrobatics]: 5,
    [Skill.arcane]: 9,
    [Skill.athletics]: 11,
    [Skill.disguise]: 13,
    [Skill.history]: 15,
});

const skillBonus1 = new SkillsBonus({
    [Skill.acrobatics]: 2,
    [Skill.arcane]: 3,
});

const skillBonus2 = new SkillsBonus({
    [Skill.athletics]: 5,
    [Skill.history]: 4,
});

const combinedSkills = fillSkills({
    [Skill.acrobatics]: 7,
    [Skill.arcane]: 12,
    [Skill.athletics]: 16,
    [Skill.disguise]: 13,
    [Skill.history]: 19,
    [Skill.sleight]: 0,
});

const baseSaves = {
    fortitude: 10,
    reflexes: 12,
    will: 14,
};

const saveBonus1 = new SavesBonus({
    fortitude: 2,
    reflexes: 3,
});

const saveBonus2 = new SavesBonus({
    will: 4,
});

const combinedSaves = {
    fortitude: 12,
    reflexes: 15,
    will: 18,
};

const baseResistances = fillResistances({
    nature: 5,
    cold: 10,
    fire: 15,
});

const resistanceBonus1 = new ResistancesBonus({
    nature: 2,
    cold: 3,
});

const resistanceBonus2 = new ResistancesBonus({
    fire: 4,
});

const combinedResistances = fillResistances({
    nature: 7,
    cold: 13,
    fire: 19,
});

const baseFeats = {
    [Feat.acrobaticSteps]: 1,
    [Feat.brewPotion]: 1,
};

const featBonus1 = new FeatsBonus([Feat.acrobaticSteps, Feat.cleave]);

const featBonus2 = new FeatsBonus([Feat.acrobaticSteps, Feat.vitalStrike]);

const combinedFeats = {
    [Feat.acrobaticSteps]: 2,
    [Feat.brewPotion]: 1,
    [Feat.cleave]: 1,
    [Feat.vitalStrike]: 1,
};

export {
    baseStats,
    statBonus1,
    statBonus2,
    combinedStats,
    baseSpeeds,
    swimSpeedBonus,
    multipleSpeedsBonus,
    combinedSpeeds,
    mkVitalsProfile,
    baseSkills,
    skillBonus1,
    skillBonus2,
    combinedSkills,
    baseSaves,
    saveBonus1,
    saveBonus2,
    combinedSaves,
    baseResistances,
    resistanceBonus1,
    resistanceBonus2,
    combinedResistances,
    baseFeats,
    featBonus1,
    featBonus2,
    combinedFeats,
};


