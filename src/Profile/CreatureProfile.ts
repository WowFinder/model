import { Size } from '@wowfinder/ts-enums';
import { type PersonalDetails } from '../Creature/Personal/builders';
import { Shapes, type Shape } from '../Item';
import { defaultArmorProfile, type ArmorProfile } from './ArmorProfile';
import {
    defaultBaseAttackProfile,
    type BaseAttackProfile,
} from './BaseAttackProfile';
import {
    buildProgressionProfile,
    type ProgressionProfile,
} from './ProgressionProfile';
import { SpeedsProfile } from './SpeedsProfile';
import {
    defaultBreathProfile,
    defaultSleepProfile,
    type VitalsProfile,
} from './VitalsProfile';
import {
    type TraitsProfile,
    type ClassFeaturesProfile,
    type FeatsProfile,
    type ResistancesProfile,
    type SavesProfile,
    type SkillsProfile,
    type SpellPowerProfile,
    type StatsProfile,
    defaultClassFeaturesProfile,
    defaultFeatsProfile,
    defaultResistancesProfile,
    defaultSavesProfile,
    defaultSkillsProfile,
    defaultSpellPowerProfile,
    defaultStatsProfile,
} from './raw';
import { mkCounter, type Transform } from '@wowfinder/ts-utils';

type CreatureProfile = {
    personal: PersonalDetails;
    shape: Shape;
    size: Size;
    stats: StatsProfile;
    speeds: SpeedsProfile;
    vitals: VitalsProfile;
    progression: ProgressionProfile;
    skills: SkillsProfile;
    saves: SavesProfile;
    resistances: ResistancesProfile;
    features: ClassFeaturesProfile;
    feats: FeatsProfile;
    traits: TraitsProfile;
    // TODO: @deprecate and remove (should be computed)
    armor: ArmorProfile;
    attack: BaseAttackProfile;
    spellPower: SpellPowerProfile;
};

const defaultCreatureProfile: Omit<CreatureProfile, 'personal'> = {
    shape: Shapes.Humanoid,
    size: Size.medium,
    stats: defaultStatsProfile,
    speeds: new SpeedsProfile({ base: 0 }),
    vitals: {
        hp: mkCounter({ max: 0 }),
        sanity: mkCounter({ max: 0 }),
        sleep: defaultSleepProfile,
        breath: defaultBreathProfile,
    },
    skills: defaultSkillsProfile,
    saves: defaultSavesProfile,
    resistances: defaultResistancesProfile,
    features: defaultClassFeaturesProfile,
    feats: defaultFeatsProfile,
    traits: [],
    armor: defaultArmorProfile,
    attack: defaultBaseAttackProfile,
    progression: buildProgressionProfile(),
    spellPower: defaultSpellPowerProfile,
};

type CreatureProfileOverride = Transform<CreatureProfile>;

export {
    type CreatureProfile,
    type CreatureProfileOverride,
    defaultCreatureProfile,
};
