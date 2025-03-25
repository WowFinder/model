import { Skill, Stat } from '@wowfinder/ts-enums';
import { SkillSpec } from './SkillSpec';

function mkSkill(
    key: Skill,
    primary: Stat,
    secondary: Stat | null = null,
    trainedOnly = false,
    sizeModFactor = 0,
): SkillSpec {
    return new SkillSpec({
        key,
        primary,
        secondary,
        trainedOnly,
        sizeModFactor,
    });
}

function mkCraft(key: Skill): SkillSpec {
    return mkSkill(key, Stat.intelligence, Stat.dexterity, true);
}

function mkLore(key: Skill): SkillSpec {
    return mkSkill(key, Stat.intelligence, Stat.wisdom, true);
}

function mkProfession(key: Skill): SkillSpec {
    return mkSkill(key, Stat.wisdom, Stat.intelligence, true);
}

function mkPerform(key: Skill): SkillSpec {
    return mkSkill(key, Stat.charisma);
}

export { mkCraft, mkLore, mkPerform, mkProfession, mkSkill };
