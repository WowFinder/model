import { EffectiveCasterLevels } from '../../Magic';
import { ClassFeature } from './Features';
import { Skill } from '@wowfinder/ts-enums';

interface ClassBonuses {
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
    features: { [key in ClassFeature]?: number };
}

export type { ClassBonuses };
