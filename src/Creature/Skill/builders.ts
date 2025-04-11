import { RawStats } from '@wowfinder/asset-schemas';
import { Skill, Stat } from '@wowfinder/ts-enums';

type SkillSpecBuilder = {
    key: Skill;
    primary: Stat;
    secondary?: Stat | null;
    trainedOnly?: boolean;
    sizeModFactor?: number;
};

type SkillTotalBuilder = {
    stats: RawStats;
    ranks: { [key in Skill]?: number };
    byClass: Skill[];
    acp: number;
    size: number;
};

export type { SkillSpecBuilder, SkillTotalBuilder };
