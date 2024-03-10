import type { RawClassAsset } from '@wowfinder/asset-schemas';
import { applyClassDefaults } from '../builder';
import { ClassTier, Skill } from '@wowfinder/ts-enums';

const minClassAsset = {
    key: 'test',
    tier: ClassTier.base,
    hd: 8,
    bab: 1,
};

describe('applyClassDefaults', () => {
    it('should apply defaults', () => {
        const result = applyClassDefaults(minClassAsset as RawClassAsset);
        expect(result).toEqual({
            ...minClassAsset,
            goodFortitude: false,
            goodReflexes: false,
            goodWill: false,
            skillRanks: 0,
            arcane: 0,
            divine: 0,
            spontaneous: 0,
            startingWealth: 0,
            features: [],
            skills: [],
            maxLevel: 20,
        });
    });

    it('defaults must not replace provided values', () => {
        const result = applyClassDefaults({
            ...minClassAsset,
            goodFortitude: true,
            goodReflexes: true,
            goodWill: true,
            skillRanks: 2,
            arcane: 1,
            divine: 1,
            spontaneous: 1,
            startingWealth: 10000,
            features: [{ level: 1, feature: 'test' }],
            skills: [Skill.acrobatics, Skill.stealth],
            maxLevel: 10,
        });
        expect(result).toEqual({
            ...minClassAsset,
            goodFortitude: true,
            goodReflexes: true,
            goodWill: true,
            skillRanks: 2,
            arcane: 1,
            divine: 1,
            spontaneous: 1,
            startingWealth: 10000,
            features: [{ level: 1, feature: 'test' }],
            skills: [Skill.acrobatics, Skill.stealth],
            maxLevel: 10,
        });
    });
});
