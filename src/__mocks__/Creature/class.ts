import { RawClassAsset } from '@wowfinder/asset-schemas';
import { ClassTier, Skill } from '@wowfinder/ts-enums';

const mockedMeleeClassRawAsset: RawClassAsset = {
    key: 'mocked-melee-class',
    tier: ClassTier.base,
    maxLevel: 20,
    hitDie: 10,
    baseAttackProgression: 1,
    goodSaves: {
        fortitude: true,
        reflexes: true,
    },
    skillRanks: 4,
    startingWealth: 10000,
    skills: [Skill.athletics, Skill.intimidate],
    features: [],
};

const mockedArcaneClassRawAsset: RawClassAsset = {
    key: 'mocked-arcane-class',
    tier: ClassTier.base,
    maxLevel: 20,
    hitDie: 6,
    baseAttackProgression: 0.5,
    goodSaves: {
        will: true,
    },
    skillRanks: 2,
    startingWealth: 10000,
    skills: [Skill.arcane, Skill.planes],
    features: [],
};

const mockedDivineClassRawAsset: RawClassAsset = {
    key: 'mocked-divine-class',
    tier: ClassTier.base,
    maxLevel: 20,
    hitDie: 8,
    baseAttackProgression: 0.75,
    goodSaves: {
        fortitude: true,
        will: true,
    },
    skillRanks: 2,
    startingWealth: 10000,
    skills: [Skill.religion, Skill.heal],
    features: [],
};

const mockedStealthClassRawAsset: RawClassAsset = {
    key: 'mocked-stealth-class',
    tier: ClassTier.base,
    maxLevel: 20,
    hitDie: 6,
    baseAttackProgression: 0.75,
    goodSaves: {
        reflexes: true,
    },
    skillRanks: 6,
    startingWealth: 10000,
    skills: [
        Skill.stealth,
        Skill.acrobatics,
        Skill.escape,
        Skill.sleight,
        Skill.disarm,
    ],
    features: [],
};

export {
    mockedMeleeClassRawAsset,
    mockedArcaneClassRawAsset,
    mockedDivineClassRawAsset,
    mockedStealthClassRawAsset,
};
