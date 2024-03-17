import { RawClassAsset } from '@wowfinder/asset-schemas';
import { Aura, ClassTier, Skill } from '@wowfinder/ts-enums';

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
    features: [
        { level: 1, feature: 'bonusCombatFeat' },
        { level: 1, feature: 'tauntAttack' },
        { level: 2, feature: 'bonusCombatFeat' },
        { level: 2, feature: 'bravery' },
        { level: 2, feature: 'tauntTarget' },
        { level: 3, feature: 'armorTraining' },
        { level: 4, feature: 'bonusCombatFeat' },
        { level: 4, feature: 'tauntArea' },
        { level: 5, feature: 'weaponTraining' },
        { level: 6, feature: 'bonusCombatFeat' },
        { level: 6, feature: 'bravery' },
        { level: 6, aura: Aura.commanding },
        { level: 7, feature: 'armorTraining' },
        { level: 8, feature: 'bonusCombatFeat' },
        { level: 8, feature: 'sunderArmor' },
        { level: 9, feature: 'weaponTraining' },
        { level: 10, feature: 'bonusCombatFeat' },
        { level: 10, feature: 'bravery' },
        { level: 10, aura: Aura.commanding },
    ],
};

export { mockedMeleeClassRawAsset };
