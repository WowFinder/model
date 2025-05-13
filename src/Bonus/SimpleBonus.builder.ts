import {
    type RawStats,
    type RawSkills,
    type RawResistances,
    type RawVitals,
} from '@wowfinder/asset-schemas';
import { type SensesBonusBuilder } from './SensesBonus';
import { type SpellPowerBonusBuilder } from './SpellPowerBonus';
import { type FeatsBonusBuilder } from './FeatsBonus';
import {
    type BaseSpeedsBonusBuilder,
    type SpeedsModifiersBonusBuilder,
} from './SpeedsBonus';
import { type SavesBonusBuilder } from './SavesBonus';

type SimpleBonusBuilder = {
    hp?: number;
    armorClass?: number;
    stats?: Partial<RawStats>;
    skills?: Partial<RawSkills>;
    saves?: SavesBonusBuilder;
    resistances?: Partial<RawResistances>;
    vitals?: Partial<RawVitals>;
    senses?: SensesBonusBuilder;
    spellPower?: SpellPowerBonusBuilder;
    feats?: FeatsBonusBuilder;
    baseSpeeds?: BaseSpeedsBonusBuilder;
    speedsModifiers?: SpeedsModifiersBonusBuilder;
};

export type { SimpleBonusBuilder };
