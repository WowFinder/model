import { RawClassAsset } from '@wowfinder/asset-schemas';
import { ClassTier, Skill } from '@wowfinder/ts-enums';

const mockStealthClassRawAsset: RawClassAsset = {
    key: 'mocked-stealth-class',
    tier: ClassTier.base,
    maxLevel: 20,
    hitDie: 8,
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
        Skill.senseMotive,
    ],
    features: [
        { level: 1, feature: 'sneak' },
        { level: 1, feature: 'trapfinding' },
        { level: 2, feature: 'evasion' },
        { level: 2, feature: 'rogueTalent' },
        { level: 3, feature: 'sneak' },
        { level: 3, feature: 'trapSense' },
        { level: 4, feature: 'rogueTalent' },
        { level: 4, feature: 'uncannyDodge' },
        { level: 5, feature: 'sneak' },
        { level: 6, feature: 'rogueTalent' },
        { level: 6, feature: 'trapSense' },
        { level: 7, feature: 'sneak' },
        { level: 8, feature: 'rogueTalent' },
        { level: 8, feature: 'improvedUncannyDodge' },
        { level: 9, feature: 'sneak' },
        { level: 9, feature: 'trapSense' },
        { level: 10, feature: 'advancedTalents' },
        { level: 10, feature: 'rogueTalent' },
    ],
};

export { mockStealthClassRawAsset };
