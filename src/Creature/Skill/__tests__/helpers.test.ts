import { Skill, Stat } from '@wowfinder/ts-enums';
import {
    classTrainedBonus,
    computeSkillTotal,
    mkCraft,
    mkLore,
    mkPerform,
    mkProfession,
    mkSkill,
} from '../helpers';
import { SkillSpec } from '../SkillSpec';
import { baseDefault } from 'Character/Stats';
describe('Skill helpers', () => {
    describe('mkSkill', () => {
        it('should return a SkillSpec', () => {
            const skill = mkSkill(Skill.acrobatics, Stat.dexterity);
            expect(skill instanceof SkillSpec).toBe(true);
            expect(skill.key).toBe('acrobatics');
            expect(skill.primary).toBe('dexterity');
            expect(skill.secondary).toBe(null);
            expect(skill.trainedOnly).toBe(false);
            expect(skill.sizeModFactor).toBe(0);
        });
    });
    describe('mkCraft', () => {
        it('should return a SkillSpec with Craft defaults', () => {
            const skill = mkCraft(Skill.alchemy);
            expect(skill instanceof SkillSpec).toBe(true);
            expect(skill.key).toBe('alchemy');
            expect(skill.primary).toBe('intelligence');
            expect(skill.secondary).toBe('dexterity');
            expect(skill.trainedOnly).toBe(true);
            expect(skill.sizeModFactor).toBe(0);
        });
    });
    describe('mkLore', () => {
        it('should return a SkillSpec with Lore defaults', () => {
            const skill = mkLore(Skill.arcane);
            expect(skill instanceof SkillSpec).toBe(true);
            expect(skill.key).toBe('arcane');
            expect(skill.primary).toBe('intelligence');
            expect(skill.secondary).toBe('wisdom');
            expect(skill.trainedOnly).toBe(true);
            expect(skill.sizeModFactor).toBe(0);
        });
    });
    describe('mkProfession', () => {
        it('should return a SkillSpec with Profession defaults', () => {
            const skill = mkProfession(Skill.butchery);
            expect(skill instanceof SkillSpec).toBe(true);
            expect(skill.key).toBe('butchery');
            expect(skill.primary).toBe('wisdom');
            expect(skill.secondary).toBe('intelligence');
            expect(skill.trainedOnly).toBe(true);
            expect(skill.sizeModFactor).toBe(0);
        });
    });
    describe('mkPerform', () => {
        it('should return a SkillSpec with Perform defaults', () => {
            const skill = mkPerform(Skill.act);
            expect(skill instanceof SkillSpec).toBe(true);
            expect(skill.key).toBe('act');
            expect(skill.primary).toBe('charisma');
            expect(skill.secondary).toBe(null);
            expect(skill.trainedOnly).toBe(false);
            expect(skill.sizeModFactor).toBe(0);
        });
    });
    describe('computeSkillTotal', () => {
        const dexterityBonus = 2;
        const valueForBonus = (bonus: number): number => 10 + 2 * bonus;
        const withDexterityBonus = {
            ...baseDefault,
            dexterity: valueForBonus(dexterityBonus),
        };
        const trainedOnlySkillSpec = mkSkill(
            Skill.disarm,
            Stat.dexterity,
            null,
            true,
        );
        it('should compute the total for a skill (simple case)', () => {
            const spec = mkSkill(Skill.acrobatics, Stat.dexterity);
            const total = computeSkillTotal({ spec });
            expect(total).toBe(0);
        });
        it('should return null for an untrained skill if it is trained-only', () => {
            const total = computeSkillTotal({
                spec: trainedOnlySkillSpec,
                stats: withDexterityBonus,
                ranks: {},
                byClass: [],
            });
            expect(total).toBe(null);
        });
        it('should treat class skills as trained even without ranks', () => {
            const total = computeSkillTotal({
                spec: trainedOnlySkillSpec,
                stats: withDexterityBonus,
                ranks: {},
                byClass: [trainedOnlySkillSpec.key],
            });
            expect(total).toBe(dexterityBonus);
        });
        it('should apply the trained bonus for class skills with ranks', () => {
            const ranks = 2;
            const total = computeSkillTotal({
                spec: trainedOnlySkillSpec,
                stats: withDexterityBonus,
                ranks: { [trainedOnlySkillSpec.key]: ranks },
                byClass: [trainedOnlySkillSpec.key],
            });
            expect(total).toBe(dexterityBonus + ranks + classTrainedBonus);
        });
        it('should apply the secondary stat bonus if it is higher than the primary', () => {
            const spec = mkCraft(Skill.leatherworking);
            const total = computeSkillTotal({
                spec,
                stats: withDexterityBonus,
                byClass: [Skill.leatherworking],
            });
            expect(total).toBe(dexterityBonus);
        });
    });
});
