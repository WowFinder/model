/* eslint-disable deprecation/deprecation */
import { EffectiveCasterLevels } from '../../Magic';
import { InventoryBuilder } from '../../Item/Inventory';
import { FeatChoice, FeatChoiceExport } from '../helpers';
import Race from '../../Creature/Race';
import { Resistances, ResistancesExport } from '../Resistances';
import { SpeedBuilder } from '../../Creature/Speeds';
import { Size } from '@wowfinder/ts-enums';
import { RawStats } from '@wowfinder/asset-schemas';

/** @deprecated */
type SkillRanks = { [key: string]: number };

/** @deprecated */
type CharacterBaseCoreBuilder = {
    key: string;
    featChoices?: Iterable<FeatChoice>;
    miscHP?: number;
    baseStats: RawStats;
    baseResistances?: Resistances;
};

/** @deprecated */
type CharacterBaseRaceBuilder = CharacterBaseCoreBuilder & {
    builderType: 'race';
    race: Race | string;
};

/** @deprecated */
type CharacterBaseFullBuilder = CharacterBaseCoreBuilder & {
    builderType: 'full';
    size: number;
    naturalArmor?: number;
    speeds?: SpeedBuilder;
    casterLevels?: Partial<EffectiveCasterLevels>;
};
/** @deprecated */
type CharacterBaseBuilder = CharacterBaseFullBuilder | CharacterBaseRaceBuilder;

/** @deprecated */
type CharacterBuilder = CharacterBaseCoreBuilder & {
    race: string;
    personal: any; // Formerly: PersonalDetailsBuilder;
    classes: { class: string; level: number }[];
    active?: boolean;
    skillRanks?: SkillRanks;
    inventory?: InventoryBuilder;
};

/** @deprecated */
type CharacterOverrideBuilder = Omit<CharacterBaseFullBuilder, 'builderType'>;

/** @deprecated */
type OverridableCharacterBaseBuilder = CharacterBaseBuilder & {
    override?: CharacterOverrideBuilder;
};

/** @deprecated */
type PersonalCharacterBaseBuilder = OverridableCharacterBaseBuilder & {
    personal: any; // Formerly: PersonalDetailsBuilder;
};

/** @deprecated */
type CharacterBaseExport = {
    key: string;
    featChoices: FeatChoiceExport[];
    miscHP: number | null;
    baseStats: RawStats;
    baseResistances: ResistancesExport;
    size: Size | null;
    naturalArmor: number | null;
};
/** @deprecated */
type CharacterPersonalExport = CharacterBaseExport & {
    personal: any; // Formerly: PersonalDetailsBuilder;
};

/** @deprecated */
type CharacterOverrideExport = CharacterBaseExport;

/** @deprecated */
type OverridableCharacterBaseExport = CharacterBaseExport & {
    override: CharacterOverrideExport;
};

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
    CharacterOverrideExport,
    OverridableCharacterBaseExport,
};
