import { BarbarianClassFeature } from './BarbarianClassFeature';
import { BardClassFeature } from './BardClassFeature';
import { ClericClassFeature } from './ClericClassFeature';
import { DruidClassFeature } from './DruidClassFeature';
import { FighterClassFeature } from './FighterClassFeature';
import { MageClassFeature } from './MageClassFeature';
import { MonkClassFeature } from './MonkClassFeature';
import { OracleClassFeature } from './OracleClassFeature';
import { RogueClassFeature } from './RogueClassFeature';
import { SharedClassFeature } from './SharedClassFeature';

const ClassFeature = {
    ...BarbarianClassFeature,
    ...BardClassFeature,
    ...ClericClassFeature,
    ...DruidClassFeature,
    ...FighterClassFeature,
    ...MageClassFeature,
    ...MonkClassFeature,
    ...OracleClassFeature,
    ...RogueClassFeature,
    ...SharedClassFeature,
} as const;

type ClassFeature = keyof typeof ClassFeature;

export { ClassFeature };
