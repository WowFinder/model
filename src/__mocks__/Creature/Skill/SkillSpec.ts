import { Skill, Stat } from '@wowfinder/ts-enums';
import { SkillSpecBuilder } from '../../../Creature/Skill/builders';

const minimalSkillSpecBuilderMock: SkillSpecBuilder = {
    key: Skill.acrobatics,
    primary: Stat.dexterity,
};

const exhaustiveSkillSpecBuilderMock: Required<SkillSpecBuilder> = {
    key: Skill.alchemy,
    primary: Stat.intelligence,
    secondary: Stat.dexterity,
    trainedOnly: true,
    sizeModFactor: 2,
};

export { minimalSkillSpecBuilderMock, exhaustiveSkillSpecBuilderMock };
