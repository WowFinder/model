import type {
    RawStats,
    RawSkills,
    RawResistances,
} from '@wowfinder/asset-schemas';
import type { VitalNeedsBonusBuilder } from './VitalNeedsBonus';
import type { SensesBonusBuilder } from './SensesBonus';
import type { SpellPowerBonusBuilder } from './SpellPowerBonus';
import type { FeatsBonusBuilder } from './FeatsBonus';
import {
    BaseSpeedsBonusBuilder,
    SpeedsModifiersBonusBuilder,
} from './SpeedsBonus';

interface SimpleBonusBuilder {
    hp?: number;
    armorClass?: number;
    stats?: Partial<RawStats>;
    skills?: Partial<RawSkills>;
    resistances?: Partial<RawResistances>;
    vitalNeeds?: VitalNeedsBonusBuilder;
    senses?: SensesBonusBuilder;
    spellPower?: SpellPowerBonusBuilder;
    feats?: FeatsBonusBuilder;
    baseSpeeds?: BaseSpeedsBonusBuilder;
    speedsModifiers?: SpeedsModifiersBonusBuilder;
}

export type { SimpleBonusBuilder };
