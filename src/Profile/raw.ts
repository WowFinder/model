import type {
    RawResistances,
    RawSaves,
    RawSkills,
    RawStats,
} from '@wowfinder/asset-schemas';
import { ClassFeature } from '@wowfinder/ts-enums';
import type { Feat } from 'Character/Feats/Feat';
import { FullComputedSpellPower } from 'Magic/SpellPower';

type ClassFeaturesProfile = Partial<Record<ClassFeature, number>>;

type FeatsProfile = Partial<Record<Feat, number>>;

type ResistancesProfile = RawResistances;

type SavesProfile = RawSaves;

type SkillsProfile = RawSkills;

type SpellPowerProfile = FullComputedSpellPower;

type StatsProfile = RawStats;

export type {
    ClassFeaturesProfile,
    FeatsProfile,
    ResistancesProfile,
    SavesProfile,
    SkillsProfile,
    SpellPowerProfile,
    StatsProfile,
};
