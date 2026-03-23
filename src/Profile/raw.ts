import {
    type RawResistances,
    type RawSaves,
    type RawSkills,
    type RawStats,
} from '@wowfinder/asset-schemas';
import { type InnateTrait, type ClassFeature } from '@wowfinder/ts-enums';
import { type Feat } from '../Creature/Feats/Feat';
import {
    fullComputedSpellPower,
    type FullComputedSpellPower,
} from '../Magic/SpellPower';
import { fillSkills } from '../Creature/Skill/Skills';

type ClassFeaturesProfile = Partial<Record<ClassFeature, number>>;
const defaultClassFeaturesProfile: ClassFeaturesProfile = {};

type FeatsProfile = Partial<Record<Feat, number>>;
const defaultFeatsProfile: FeatsProfile = {};

type ResistancesProfile = RawResistances;
const defaultResistancesProfile: ResistancesProfile = {
    bludgeoning: 0,
    piercing: 0,
    slashing: 0,
    arcane: 0,
    fire: 0,
    cold: 0,
    holy: 0,
    nature: 0,
    shadow: 0,
    psychic: 0,
};

type SavesProfile = RawSaves;
const defaultSavesProfile: SavesProfile = {
    fortitude: 0,
    reflexes: 0,
    will: 0,
};

type SkillsProfile = RawSkills;
const defaultSkillsProfile: SkillsProfile = fillSkills({});

type SpellPowerProfile = FullComputedSpellPower;
const defaultSpellPowerProfile: SpellPowerProfile = fullComputedSpellPower();

type StatsProfile = RawStats;
const defaultStatsProfile: StatsProfile = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
};

type TraitsProfile = InnateTrait[];
const defaultTraitsProfile: TraitsProfile = [];

export {
    type ClassFeaturesProfile,
    defaultClassFeaturesProfile,
    type FeatsProfile,
    defaultFeatsProfile,
    type ResistancesProfile,
    defaultResistancesProfile,
    type SavesProfile,
    defaultSavesProfile,
    type SkillsProfile,
    defaultSkillsProfile,
    type SpellPowerProfile,
    defaultSpellPowerProfile,
    type StatsProfile,
    defaultStatsProfile,
    type TraitsProfile,
    defaultTraitsProfile,
};
