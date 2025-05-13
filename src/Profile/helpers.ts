import { Skill, Stat } from '@wowfinder/ts-enums';
import { SkillsBonus, StatsBonus } from '../Bonus';
import { SkillsProfile, StatsProfile } from './raw';

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
    Object.keys(Skill).filter(k => k in totalBonuses).forEach(key => {
        const k = key as keyof SkillsProfile;
        skills[k] += totalBonuses[k];
    });
    return skills;
}

export { addStats, addSkills };
