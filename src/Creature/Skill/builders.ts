import { Stats } from '@wowfinder/asset-schemas';
import { Skill, Stat } from '@wowfinder/ts-enums';

interface SkillSpecBuilder {
    key: Skill;
    primary: Stat;
    secondary?: Stat | null;
    trainedOnly?: boolean;
    sizeModFactor?: number;
}

interface SkillTotalBuilder {
    stats: Stats;
    ranks: { [key in Skill]?: number };
    byClass: Skill[];
    acp: number;
    size: number;
}

export type { SkillSpecBuilder, SkillTotalBuilder };
