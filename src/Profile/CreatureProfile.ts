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

type CreatureBaseProfile = {
    stats: StatsProfile;
    speeds: SpeedsProfile;
    vitals: VitalsProfile;
    skills: SkillsProfile;
    saves: SavesProfile;
    resistances: ResistancesProfile;
    // TODO traits: TraitsProfile
    features: ClassFeaturesProfile;
    feats: FeatsProfile;
};

type CreatureProfile = CreatureBaseProfile & {
    personal: PersonalDetails;
    shape: Shape;
    size: Size;
    // TODO: @deprecate and remove: Used under Old.Character types and CharacterRequirementsPlaceholder */
    progression: ProgressionProfile;
    // TODO: @deprecate and remove (should be computed)
    armor: ArmorProfile;
    attack: BaseAttackProfile;
    spellPower: SpellPowerProfile;
};

// TODO: Redefine with a `Transform<T>` type in @wowfinder/ts-utils
// ie: type Transform<T> = (base: T) => T;
type CreatureBaseProfileOverride = (
    base: CreatureBaseProfile,
) => CreatureBaseProfile;

export {
    type CreatureBaseProfile,
    type CreatureProfile,
    type CreatureBaseProfileOverride,
};
