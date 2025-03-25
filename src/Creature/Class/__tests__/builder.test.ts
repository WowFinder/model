import { applyClassDefaults } from '../builder';
import { ClassTier, Skill } from '@wowfinder/ts-enums';

const minClassAsset = {
    key: 'test',
    tier: ClassTier.base,
    hitDie: 8,
    baseAttackProgression: 1,
    maxLevel: 20,
    skillRanks: 0,
    startingWealth: 0,
    skills: [],
    features: [],
};

describe('applyClassDefaults', () => {
    it('should apply defaults', () => {
        const result = applyClassDefaults(minClassAsset);
        expect(result).toEqual({
            ...minClassAsset,
            goodSaves: {
                fortitude: false,
                reflexes: false,
                will: false,
            },
            skillRanks: 0,
            spellCasting: {
                arcane: 0,
                divine: 0,
                spontaneous: 0,
            },
            startingWealth: 0,
            features: [],
            skills: [],
            maxLevel: 20,
        });
    });

    it('defaults must not replace provided values', () => {
        const result = applyClassDefaults({
            ...minClassAsset,
            goodSaves: {
                fortitude: true,
                reflexes: true,
                will: true,
            },
            skillRanks: 2,
            spellCasting: {
                arcane: 1,
                divine: 1,
                spontaneous: 1,
            },
            startingWealth: 10000,
            features: [{ level: 1, feature: 'test' }],
            skills: [Skill.acrobatics, Skill.stealth],
            maxLevel: 10,
        });
        expect(result).toEqual({
            ...minClassAsset,
            goodSaves: {
                fortitude: true,
                reflexes: true,
                will: true,
            },
            skillRanks: 2,
            spellCasting: {
                arcane: 1,
                divine: 1,
                spontaneous: 1,
            },
            startingWealth: 10000,
            features: [{ level: 1, feature: 'test' }],
            skills: [Skill.acrobatics, Skill.stealth],
            maxLevel: 10,
        });
    });
});
