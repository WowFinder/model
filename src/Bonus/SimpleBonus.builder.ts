import { RawStats, RawSkills, RawResistances } from '@wowfinder/asset-schemas';
import { BonusType } from '@wowfinder/ts-enums';
import { VitalNeedsBonusBuilder } from './VitalNeedsBonus';
import { SensesBonusBuilder } from './SensesBonus';
import { SpellPowerBonusBuilder } from './SpellPowerBonus';

interface SimpleBonusBuilder {
    type: BonusType;
    hp?: number;
    armorClass?: number;
    stats?: Partial<RawStats>;
    skills?: Partial<RawSkills>;
    resistances?: Partial<RawResistances>;
    vitalNeeds?: VitalNeedsBonusBuilder;
    senses?: SensesBonusBuilder;
    spellPower?: SpellPowerBonusBuilder;
    // TODO ...
}

export type { SimpleBonusBuilder };
