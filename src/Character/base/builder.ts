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

type SkillRanks = { [key: string]: number };

interface CharacterBaseCoreBuilder {
    key: string;
    featChoices?: Iterable<FeatChoice>;
    miscHP?: number;
    baseStats: Stats;
    baseResistances?: Resistances;
}

interface CharacterBaseRaceBuilder extends CharacterBaseCoreBuilder {
    builderType: 'race';
    race: Race | string;
}

interface CharacterBaseFullBuilder extends CharacterBaseCoreBuilder {
    builderType: 'full';
    size: number;
    naturalArmor?: number;
    speeds?: SpeedBuilder;
    casterLevels?: Partial<EffectiveCasterLevels>;
}
type CharacterBaseBuilder = CharacterBaseFullBuilder | CharacterBaseRaceBuilder;
interface CharacterBuilder extends CharacterBaseCoreBuilder {
    race: string;
    personal: CharPersonalDetailsBuilder;
    classes: { class: string; level: number }[];
    active?: boolean;
    skillRanks?: SkillRanks;
    inventory?: InventoryBuilder;
}

type CharacterOverrideBuilder = Omit<CharacterBaseFullBuilder, 'builderType'>;

type OverridableCharacterBaseBuilder = CharacterBaseBuilder & {
    override?: CharacterOverrideBuilder;
};

type PersonalCharacterBaseBuilder = OverridableCharacterBaseBuilder & {
    personal: CharPersonalDetailsBuilder;
};

interface CharacterBaseExport {
    key: string;
    featChoices: FeatChoiceExport[];
    miscHP: number | null;
    baseStats: Stats;
    baseResistances: ResistancesExport;
    size: Size | null;
    naturalArmor: number | null;
}
interface CharacterPersonalExport extends CharacterBaseExport {
    personal: CharPersonalDetailsBuilder;
}
interface CharacterExport extends CharacterPersonalExport {
    [key: string]: JsonValue;
    race: string;
    classes: { class: string; level: number }[];
    active: boolean;
    skillRanks: SkillRanks;
    inventory: InventoryExport;
}

type CharacterOverrideExport = CharacterBaseExport;

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
