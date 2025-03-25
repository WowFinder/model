import { Skill } from '@wowfinder/ts-enums';
import { SkillsBonus } from '..';
import {
    skillsBonusDefaultBuilder,
    skillsBonusFullBuilder,
} from '../../../__mocks__';

describe('SkillsBonus', () => {
    let defaultBonus: SkillsBonus;
    let fullBonus: SkillsBonus;

    beforeEach(() => {
        defaultBonus = new SkillsBonus(skillsBonusDefaultBuilder);
        fullBonus = new SkillsBonus(skillsBonusFullBuilder);
    });

    it('should construct a default instance', () => {
        expect(defaultBonus.isZero).toBe(true);
    });

    it('should construct a full instance', () => {
        expect(fullBonus.isZero).toBe(false);
        for (const skill of Object.keys(Skill)) {
            expect(fullBonus[skill as Skill]).toBe(
                skillsBonusFullBuilder[skill as Skill],
            );
        }
    });

    it('should return a zero bonus', () => {
        expect(SkillsBonus.zero.isZero).toBe(true);
    });

    it('should sum bonuses', () => {
        const bonusesToAdd = [
            fullBonus,
            defaultBonus,
            fullBonus,
            defaultBonus,
            fullBonus,
        ];
        const fullBonusCount = bonusesToAdd.filter(
            bonus => bonus === fullBonus,
        ).length;
        const sumBonus = SkillsBonus.sum(...bonusesToAdd);
        for (const skill of Object.keys(Skill)) {
            expect(sumBonus[skill as Skill]).toBe(
                skillsBonusFullBuilder[skill as Skill] * fullBonusCount,
            );
        }
    });

    it('should get the maximum bonus', () => {
        const maxBonus = SkillsBonus.max(fullBonus, defaultBonus);
        for (const skill of Object.keys(Skill)) {
            expect(maxBonus[skill as Skill]).toBe(
                skillsBonusFullBuilder[skill as Skill],
            );
        }
    });

    it('should multiply a bonus by a factor', () => {
        const factor = 2;
        const multipliedBonus = SkillsBonus.multiply(fullBonus, factor);
        for (const skill of Object.keys(Skill)) {
            expect(multipliedBonus[skill as Skill]).toBe(
                skillsBonusFullBuilder[skill as Skill] * factor,
            );
        }
    });

    it('should export the bonus', () => {
        const exportedBonus = fullBonus.export();
        for (const skill of Object.keys(Skill)) {
            expect(exportedBonus[skill as Skill]).toBe(
                skillsBonusFullBuilder[skill as Skill],
            );
        }
    });
});
