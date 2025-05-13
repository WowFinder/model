import { Stat, Skill } from '@wowfinder/ts-enums';
import { addStats, addSkills, addSaves, addResistances } from '../helpers';
import {
    StatsBonus,
    SkillsBonus,
    SavesBonus,
    ResistancesBonus,
} from '../../Bonus';
import { fillSkills } from '../../Creature/Skill/Skills';
import { fillResistances } from '../../Creature/Resistances/fill';

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

        const newSkillsProfile = addSkills(
            baseSkills,
            skillBonus1,
            skillBonus2,
        );

        expect(newSkillsProfile.acrobatics).toBe(7);
        expect(newSkillsProfile.arcane).toBe(12);
        expect(newSkillsProfile.athletics).toBe(16);
        expect(newSkillsProfile.disguise).toBe(13);
        expect(newSkillsProfile.history).toBe(19);
        expect(newSkillsProfile.sleight).toBe(0);
    });
});

describe('addSaves', () => {
    it('should add saves bonuses to a SavesProfile', () => {
        const baseSaves = {
            fortitude: 10,
            reflexes: 12,
            will: 14,
        };

        const saveBonus1 = new SavesBonus({
            fortitude: 2,
            reflexes: 3,
        });

        const saveBonus2 = new SavesBonus({
            will: 4,
        });

        const newSavesProfile = addSaves(baseSaves, saveBonus1, saveBonus2);

        expect(newSavesProfile.fortitude).toBe(12);
        expect(newSavesProfile.reflexes).toBe(15);
        expect(newSavesProfile.will).toBe(18);
    });
});

describe('addResistances', () => {
    it('should add resistances bonuses to a ResistancesProfile', () => {
        const baseResistances = fillResistances({
            nature: 5,
            cold: 10,
            fire: 15,
        });

        const resistanceBonus1 = new ResistancesBonus({
            nature: 2,
            cold: 3,
        });

        const resistanceBonus2 = new ResistancesBonus({
            fire: 4,
        });

        const newResistancesProfile = addResistances(
            baseResistances,
            resistanceBonus1,
            resistanceBonus2,
        );

        expect(newResistancesProfile.nature).toBe(7);
        expect(newResistancesProfile.cold).toBe(13);
        expect(newResistancesProfile.fire).toBe(19);
        expect(newResistancesProfile.holy).toBe(0);
        expect(newResistancesProfile.psychic).toBe(0);
    });
});
