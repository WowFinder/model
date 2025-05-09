import { type EffectiveCasterLevels } from '../../Magic';
import { type ProgressionFeature } from './Features';
import { type Skill } from '@wowfinder/ts-enums';

type ProgressionBonuses = {
    hp: number;
    bab: number;
    saves: {
        fort: number;
        refl: number;
        will: number;
    };
    efl: EffectiveCasterLevels;
    skillRanks: number;
    classSkills: Set<Skill>;
    features: { [key in ProgressionFeature]?: number };
};

export type { ProgressionBonuses };
