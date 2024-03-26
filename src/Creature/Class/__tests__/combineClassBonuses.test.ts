import { RawSaves } from '@wowfinder/asset-schemas';
import { Class, ClassLevels } from '..';
import {
    combineClassBonuses,
    goodSave,
    poorSave,
} from '../combineClassBonuses';
import {
    mockMeleeClassRawAsset,
    mockArcaneClassRawAsset,
    mockDivineClassRawAsset,
    mockStealthClassRawAsset,
} from '__mocks__';

describe('combineClassBonuses', () => {
    const classes = {
        melee: new Class(mockMeleeClassRawAsset),
        arcane: new Class(mockArcaneClassRawAsset),
        divine: new Class(mockDivineClassRawAsset),
        stealth: new Class(mockStealthClassRawAsset),
    };
    const classLevels: ClassLevels = [
        { class: classes.melee, level: 8 },
        { class: classes.arcane, level: 4 },
        { class: classes.divine, level: 2 },
        { class: classes.stealth, level: 1 },
    ];
    const bonuses = combineClassBonuses(classLevels);
    it('should compute hitpoints correctly', () => {
        // 8 levels of d10, 4 levels of d6, 2 levels of d8, 1 level of d8
        // Bonus for first level: +4
        expect(bonuses.hp).toBe(4 + 8 * 6 + 4 * 4 + 2 * 5 + 1 * 5);
    });
    it('should compute base attack bonus correctly', () => {
        // 8 levels of 1, 4 levels of 0.5, 2 levels of 0.75, 1 level of 0.75
        expect(bonuses.bab).toBe(Math.floor(8 + 4 * 0.5 + 2 * 0.75 + 1 * 0.75));
    });
    it('should compute saves correctly', () => {
        /* Expected values:
            fortitude: Good: 8 (melee) + 2 (divine); Poor: 4 (arcane) + 1 (stealth);
            reflexes: Good: 8 (melee) + 1 (stealth); Poor: 4 (arcane) + 2 (divine);
            will: Good: 2 (divine) + 2 (arcane); Poor: 8 (melee) + 1 (stealth);
        */
        const expected: RawSaves = {
            fortitude: Math.floor(goodSave * (8 + 2) + poorSave * (4 + 1) + 2),
            reflexes: Math.floor(goodSave * (8 + 1) + poorSave * (4 + 2) + 2),
            will: Math.floor(goodSave * (2 + 2) + poorSave * (8 + 1) + 2),
        };
        expect(bonuses.saves.fort).toBe(expected.fortitude);
        expect(bonuses.saves.refl).toBe(expected.reflexes);
        expect(bonuses.saves.will).toBe(expected.will);
    });
    it('should compute effective caster levels correctly', () => {
        // 4 levels of arcane, 2 levels of divine
        expect(bonuses.efl.arcane).toBe(4);
        expect(bonuses.efl.divine).toBe(2);
        expect(bonuses.efl.spontaneous).toBe(0);
    });
    it('should compute skill ranks correctly', () => {
        // 8 levels of 4, 4 + 2 levels of 2, 1 level of 6
        expect(bonuses.skillRanks).toBe(8 * 4 + (4 + 2) * 2 + 6);
    });
    it('should compute class skills correctly', () => {
        Object.values(classes).forEach(c => {
            c.classSkills.forEach(s => {
                expect(bonuses.classSkills.has(s)).toBe(true);
            });
        });
    });
});
