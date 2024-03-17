import { Skill } from '@wowfinder/ts-enums';
import {
    cmp,
    expectedByLevel,
    hybrid,
    totalFeatureCountAtLevel,
} from './Class.helpers';

const evenKeyedSkills = Object.values(Skill).filter(
    s => `${s}`.length % 2 === 0,
);

describe('Class', () => {
    it('should have the correct key', () => {
        expect(hybrid.key).toBe('mocked-super-hybrid-class');
    });
    it('should have the correct tier', () => {
        expect(hybrid.tier).toBe('advanced');
    });
    it('should have the correct max level', () => {
        expect(hybrid.maxLevel).toBe(10);
    });
    it('should have the correct hit die', () => {
        expect(hybrid.hitDie).toBe(8);
    });
    it('should have the correct base attack progression', () => {
        expect(hybrid.baseAttackProgression).toBe(0.75);
    });
    it('should have the correct good saves', () => {
        expect(hybrid.saves).toEqual({
            fortitude: true,
            reflexes: true,
            will: true,
        });
    });
    it('should have the correct skill ranks', () => {
        expect(hybrid.skillRanks).toBe(6);
    });
    it('should have the correct class skills', () => {
        expect(hybrid.classSkills).toEqual(new Set(evenKeyedSkills));
    });
    it('should have the correct spell casting progression', () => {
        expect(hybrid.casting.arcane).toBe(0);
        expect(hybrid.casting.divine).toBeCloseTo(0.666667, 4);
        expect(hybrid.casting.spontaneous).toBeCloseTo(0.666667, 4);
    });
    describe('features at each level', () => {
        const expectAtLevel = (level: number): void => {
            const currentLevelSorted = hybrid.featuresAt(level).toSorted(cmp);
            expect(currentLevelSorted).toEqual(expectedByLevel[level]);
            const features = hybrid.features(level);
            expectedByLevel[level].forEach(f => {
                expect(features).toContain(f);
            });
            expect(features.length).toBe(totalFeatureCountAtLevel(level));
        };
        const classLevels = Array.from(
            { length: hybrid.maxLevel },
            (_, i) => i + 1,
        );
        classLevels.forEach(level => {
            it(`should have the correct features at level ${level}`, () => {
                expectAtLevel(level);
            });
        });
    });
    describe('aurasList', () => {
        it('should have the correct aurasList', () => {
            expect(hybrid.aurasList.length).toEqual(6);
        });
    });
    describe('auras', () => {
        it('should have no auras before level 6', () => {
            for (let i = 1; i < 6; i++) {
                expect(hybrid.auras(i).length).toEqual(0);
            }
        });
        it('should have three auras between levels 6 and 9 (inclusive)', () => {
            for (let i = 6; i < 10; i++) {
                expect(hybrid.auras(i).length).toEqual(3);
            }
        });
        it('should have six auras at level 10', () => {
            expect(hybrid.auras(10).length).toEqual(6);
        });
    });
    it('should have the correct starting wealth', () => {
        expect(hybrid.startingWealth.raw).toBe(10000);
    });
    describe('multiClass (static)', () => {
        it('should dispatch to the helper method', () => {});
    });
});
