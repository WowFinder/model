import { DamageType, Skill, Stat } from '@wowfinder/ts-enums';
import { ResistancesBonus, SkillsBonus, StatsBonus } from '../Bonus';
import {
    ResistancesProfile,
    SavesProfile,
    SkillsProfile,
    StatsProfile,
} from './raw';
import { SavesBonus } from '../Bonus/SavesBonus';

function addStats(base: StatsProfile, ...bonuses: StatsBonus[]): StatsProfile {
    const totalBonuses = StatsBonus.sum(...bonuses);
    const stats = { ...base };
    Object.keys(Stat).forEach(key => {
        const k = key as keyof StatsProfile;
        stats[k] += totalBonuses[k];
    });
    return stats;
}

function addSkills(
    base: SkillsProfile,
    ...bonuses: SkillsBonus[]
): SkillsProfile {
    const totalBonuses = SkillsBonus.sum(...bonuses);
    const skills = { ...base };
    Object.keys(Skill)
        .filter(k => k in totalBonuses)
        .forEach(key => {
            const k = key as keyof SkillsProfile;
            skills[k] += totalBonuses[k];
        });
    return skills;
}

function addSaves(base: SavesProfile, ...bonuses: SavesBonus[]): SavesProfile {
    const totalBonuses = SavesBonus.sum(...bonuses);
    return {
        fortitude: base.fortitude + totalBonuses.fortitude,
        reflexes: base.reflexes + totalBonuses.reflexes,
        will: base.will + totalBonuses.will,
    };
}

function addResistances(
    base: ResistancesProfile,
    ...bonuses: ResistancesBonus[]
): ResistancesProfile {
    const totalBonuses = ResistancesBonus.sum(...bonuses);
    const resistances = { ...base };
    Object.keys(DamageType).forEach(key => {
        const k = key as keyof ResistancesProfile;
        resistances[k] += totalBonuses[k];
    });
    return resistances;
}

export { addStats, addSkills, addSaves, addResistances };
