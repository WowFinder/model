import { RawClassAsset } from '@wowfinder/asset-schemas';
import { Aura, ClassTier, Skill } from '@wowfinder/ts-enums';

const mockDivineClassRawAsset: RawClassAsset = {
    key: 'mocked-divine-class',
    tier: ClassTier.base,
    maxLevel: 20,
    hitDie: 8,
    baseAttackProgression: 0.75,
    goodSaves: {
        fortitude: true,
        will: true,
    },
    spellCasting: {
        divine: 1,
    },
    skillRanks: 2,
    startingWealth: 10000,
    skills: [Skill.religion, Skill.heal, Skill.senseMotive],
    features: [
        { level: 1, feature: 'deityAura' },
        { level: 1, feature: 'channel' },
        { level: 1, feature: 'domains' },
        { level: 3, feature: 'channel' },
        { level: 3, feature: 'attonementMelee' },
        { level: 5, feature: 'channel' },
        { level: 6, feature: 'attonementRanged' },
        { level: 6, aura: Aura.fortitude },
        { level: 7, feature: 'channel' },
        { level: 9, feature: 'channel' },
        { level: 9, feature: 'attonementSpell' },
        { level: 10, aura: Aura.fortitude },
    ],
};

const mockDruidricClassRawAsset: RawClassAsset = {
    ...mockDivineClassRawAsset,
    key: 'mocked-druidric-class',
    skills: [Skill.nature, Skill.handleAnimal, Skill.perception],
    features: [
        { level: 1, feature: 'natureBond' },
        { level: 1, feature: 'wildEmpathy' },
        { level: 1, feature: 'tracklessSteps' },
        { level: 3, feature: 'rejuvenation' },
        { level: 4, feature: 'bearForm' },
        { level: 4, feature: 'tranquility' },
        { level: 5, feature: 'regrowth' },
        { level: 6, feature: 'catForm' },
        { level: 6, feature: 'rejuvenation' },
        { level: 8, feature: 'moonkinForm' },
        { level: 8, feature: 'bearForm' },
        { level: 9, feature: 'rejuvenation' },
        { level: 10, feature: 'treeLifeForm' },
    ],
};

export { mockDivineClassRawAsset, mockDruidricClassRawAsset };
