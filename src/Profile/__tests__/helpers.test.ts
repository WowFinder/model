import { Stat, Skill } from '@wowfinder/ts-enums';
import { addStats, addSkills } from '../helpers';
import { StatsBonus, SkillsBonus } from '../../Bonus';
import { fillSkills } from '../../Creature/Skill/Skills';

describe('addStats', () => {
    it('should add stats bonuses to a StatsProfile', () => {
        const baseStats = {
            [Stat.strength]: 10,
            [Stat.dexterity]: 12,
            [Stat.constitution]: 14,
            [Stat.intelligence]: 16,
            [Stat.wisdom]: 18,
            [Stat.charisma]: 20,
        };

        const statBonus1 = new StatsBonus({
            [Stat.strength]: 2,
            [Stat.dexterity]: 3,
        });

        const statBonus2 = new StatsBonus({
            [Stat.constitution]: 4,
            [Stat.intelligence]: 5,
        });

        const newStatsProfile = addStats(baseStats, statBonus1, statBonus2);

        expect(newStatsProfile.strength).toBe(12);
        expect(newStatsProfile.dexterity).toBe(15);
        expect(newStatsProfile.constitution).toBe(18);
        expect(newStatsProfile.intelligence).toBe(21);
        expect(newStatsProfile.wisdom).toBe(18);
        expect(newStatsProfile.charisma).toBe(20);
    });
});

describe('addSkills', () => {
    it('should add skills bonuses to a SkillsProfile', () => {
        const baseSkills = fillSkills({
            [Skill.acrobatics]: 5,
            [Skill.arcane]: 9,
            [Skill.athletics]: 11,
            [Skill.disguise]: 13,
            [Skill.history]: 15,
        });

        const skillBonus1 = new SkillsBonus({
            [Skill.acrobatics]: 2,
            [Skill.arcane]: 3,
        });

        const skillBonus2 = new SkillsBonus({
            [Skill.athletics]: 5,
            [Skill.history]: 4,
        });

        const newSkillsProfile = addSkills(baseSkills, skillBonus1, skillBonus2);

        expect(newSkillsProfile.acrobatics).toBe(7);
        expect(newSkillsProfile.arcane).toBe(12);
        expect(newSkillsProfile.athletics).toBe(16);
        expect(newSkillsProfile.disguise).toBe(13);
        expect(newSkillsProfile.history).toBe(19);
        expect(newSkillsProfile.sleight).toBe(0);
    });
});