import { Skill } from '@wowfinder/ts-enums';
import { SkillsBonus } from '../../../Bonus';
import { fillSkills } from '../../../Creature/Skill/Skills';

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

const combinedSkills = fillSkills({
    [Skill.acrobatics]: 7,
    [Skill.arcane]: 12,
    [Skill.athletics]: 16,
    [Skill.disguise]: 13,
    [Skill.history]: 19,
    [Skill.sleight]: 0,
});

export { baseSkills, skillBonus1, skillBonus2, combinedSkills };
