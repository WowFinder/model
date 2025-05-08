import type { Size } from '@wowfinder/ts-enums';
import type { PersonalDetails } from '../Creature/Personal/builders';
import type { Shape } from '../Item';
import type { ArmorProfile } from './ArmorProfile';
import type { BaseAttackProfile } from './BaseAttackProfile';
import type { ProgressionProfile } from './ProgressionProfile';
import type { SpeedsProfile } from './SpeedsProfile';
import type { VitalsProfile } from './VitalsProfile';
import type {
    ClassFeaturesProfile,
    FeatsProfile,
    ResistancesProfile,
    SavesProfile,
    SkillsProfile,
    SpellPowerProfile,
    StatsProfile,
} from './raw';

type CreatureProfile = {
    personal: PersonalDetails;
    shape: Shape;
    size: Size;
    stats: StatsProfile;
    progression: ProgressionProfile;
    speeds: SpeedsProfile;
    vitals: VitalsProfile;
    skills: SkillsProfile;
    saves: SavesProfile;
    resistances: ResistancesProfile;
    // TODO traitsProfile
    features: ClassFeaturesProfile;
    feats: FeatsProfile;
    armor: ArmorProfile;
    attack: BaseAttackProfile;
    spellPower: SpellPowerProfile;
};

export type { CreatureProfile };
