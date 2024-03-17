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

export { mockDivineClassRawAsset };
