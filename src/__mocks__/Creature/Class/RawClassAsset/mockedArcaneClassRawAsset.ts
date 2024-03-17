import { RawClassAsset } from '@wowfinder/asset-schemas';
import { Aura, ClassTier, Skill } from '@wowfinder/ts-enums';

const mockedArcaneClassRawAsset: RawClassAsset = {
    key: 'mocked-arcane-class',
    tier: ClassTier.base,
    maxLevel: 20,
    hitDie: 6,
    baseAttackProgression: 0.5,
    goodSaves: {
        will: true,
    },
    spellCasting: {
        arcane: 1,
    },
    skillRanks: 2,
    startingWealth: 10000,
    skills: [Skill.arcane, Skill.planes],
    features: [
        { level: 1, feature: 'arcaneBond' },
        { level: 1, feature: 'arcaneSchool' },
        { level: 1, feature: 'bloodline' },
        { level: 1, feature: 'featScribeScroll' },
        { level: 1, feature: 'featSchewMaterials' },
        { level: 3, feature: 'bloodlinePower' },
        { level: 3, feature: 'bloodlineSpell' },
        { level: 4, feature: 'evocation' },
        { level: 5, feature: 'bonusArcaneFeat' },
        { level: 5, feature: 'bloodlineSpell' },
        { level: 6, aura: Aura.arcane },
        { level: 7, feature: 'bloodlineFeat' },
        { level: 7, feature: 'bloodlineSpell' },
        { level: 9, feature: 'bloodlinePower' },
        { level: 9, feature: 'bloodlineSpell' },
        { level: 10, aura: Aura.arcane },
        { level: 10, feature: 'bonusArcaneFeat' },
    ],
};

export { mockedArcaneClassRawAsset };
