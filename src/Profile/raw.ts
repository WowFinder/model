import {
    type RawResistances,
    type RawSaves,
    type RawSkills,
    type RawStats,
} from '@wowfinder/asset-schemas';
import { type InnateTrait, type ClassFeature } from '@wowfinder/ts-enums';
import { type Feat } from '../Creature/Feats/Feat';
import { type FullComputedSpellPower } from '../Magic/SpellPower';

type ClassFeaturesProfile = Partial<Record<ClassFeature, number>>;

type FeatsProfile = Partial<Record<Feat, number>>;

type ResistancesProfile = RawResistances;

type SavesProfile = RawSaves;

type SkillsProfile = RawSkills;

type SpellPowerProfile = FullComputedSpellPower;

type StatsProfile = RawStats;

type TraitsPropfile = InnateTrait[];

export {
    type ClassFeaturesProfile,
    type FeatsProfile,
    type ResistancesProfile,
    type SavesProfile,
    type SkillsProfile,
    type SpellPowerProfile,
    type StatsProfile,
    type TraitsPropfile,
};
