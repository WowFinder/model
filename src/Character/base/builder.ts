/* eslint-disable deprecation/deprecation */
import { EffectiveCasterLevels } from 'Magic';
import { JsonValue } from '@wowfinder/ts-utils';
import { InventoryBuilder, InventoryExport } from '../../Item/Inventory';
import { FeatChoice, FeatChoiceExport } from '../helpers';
import { CharPersonalDetailsBuilder } from '../Personal';
import Race from '../../Creature/Race';
import { Resistances, ResistancesExport } from '../Resistances';
import { SpeedBuilder } from '../../Creature/Speeds';
import { Size } from '@wowfinder/ts-enums';
import { Stats } from '@wowfinder/asset-schemas';

/** @deprecated */
type SkillRanks = { [key: string]: number };

/** @deprecated */
interface CharacterBaseCoreBuilder {
    key: string;
    featChoices?: Iterable<FeatChoice>;
    miscHP?: number;
    baseStats: Stats;
    baseResistances?: Resistances;
}

/** @deprecated */
interface CharacterBaseRaceBuilder extends CharacterBaseCoreBuilder {
    builderType: 'race';
    race: Race | string;
}

/** @deprecated */
interface CharacterBaseFullBuilder extends CharacterBaseCoreBuilder {
    builderType: 'full';
    size: number;
    naturalArmor?: number;
    speeds?: SpeedBuilder;
    casterLevels?: Partial<EffectiveCasterLevels>;
}
/** @deprecated */
type CharacterBaseBuilder = CharacterBaseFullBuilder | CharacterBaseRaceBuilder;

/** @deprecated */
interface CharacterBuilder extends CharacterBaseCoreBuilder {
    race: string;
    personal: CharPersonalDetailsBuilder;
    classes: { class: string; level: number }[];
    active?: boolean;
    skillRanks?: SkillRanks;
    inventory?: InventoryBuilder;
}

/** @deprecated */
type CharacterOverrideBuilder = Omit<CharacterBaseFullBuilder, 'builderType'>;

/** @deprecated */
type OverridableCharacterBaseBuilder = CharacterBaseBuilder & {
    override?: CharacterOverrideBuilder;
};

/** @deprecated */
type PersonalCharacterBaseBuilder = OverridableCharacterBaseBuilder & {
    personal: CharPersonalDetailsBuilder;
};

/** @deprecated */
interface CharacterBaseExport {
    key: string;
    featChoices: FeatChoiceExport[];
    miscHP: number | null;
    baseStats: Stats;
    baseResistances: ResistancesExport;
    size: Size | null;
    naturalArmor: number | null;
}
/** @deprecated */
interface CharacterPersonalExport extends CharacterBaseExport {
    personal: CharPersonalDetailsBuilder;
}
/** @deprecated */
interface CharacterExport extends CharacterPersonalExport {
    [key: string]: JsonValue;
    race: string;
    classes: { class: string; level: number }[];
    active: boolean;
    skillRanks: SkillRanks;
    inventory: InventoryExport;
}

/** @deprecated */
type CharacterOverrideExport = CharacterBaseExport;

/** @deprecated */
interface OverridableCharacterBaseExport extends CharacterBaseExport {
    override: CharacterOverrideExport;
}

export type {
    SkillRanks,
    CharacterBaseCoreBuilder,
    CharacterBaseRaceBuilder,
    CharacterBaseFullBuilder,
    CharacterBaseBuilder,
    CharacterBuilder,
    CharacterOverrideBuilder,
    OverridableCharacterBaseBuilder,
    PersonalCharacterBaseBuilder,
    CharacterBaseExport,
    CharacterPersonalExport,
    CharacterExport,
    CharacterOverrideExport,
    OverridableCharacterBaseExport,
};
