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

interface CreatureProfile {
    personalDetails: PersonalDetails;
    shape: Shape;
    size: Size;
    statsProfile: StatsProfile;
    progressionProfile: ProgressionProfile;
    speedsProfile: SpeedsProfile;
    vitalsProfile: VitalsProfile;
    skillsProfile: SkillsProfile;
    savesProfile: SavesProfile;
    resistancesProfile: ResistancesProfile;
    // TODO traitsProfile
    classFeaturesProfile: ClassFeaturesProfile;
    featsProfile: FeatsProfile;
    armorProfile: ArmorProfile;
    baseAttackProfile: BaseAttackProfile;
    spellPowerProfile: SpellPowerProfile;
}

export type { CreatureProfile };
