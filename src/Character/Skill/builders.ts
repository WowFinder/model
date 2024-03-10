import { Skill, Stat } from '@wowfinder/ts-enums';
import { StatSet } from '../Stats';

interface SkillSpecBuilder {
    key: Skill;
    primary: Stat;
    secondary: Stat | null;
    trainedOnly: boolean;
    sizeModFactor: number;
}

interface SkillTotalBuilder {
    stats: StatSet;
    ranks: { [key in Skill]?: number };
    byClass: Skill[];
    acp: number;
    size: number;
}

export type { SkillSpecBuilder, SkillTotalBuilder };
