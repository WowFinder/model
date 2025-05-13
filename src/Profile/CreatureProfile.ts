import { type Size } from '@wowfinder/ts-enums';
import { type PersonalDetails } from '../Creature/Personal/builders';
import { type Shape } from '../Item';
import { type ArmorProfile } from './ArmorProfile';
import { type BaseAttackProfile } from './BaseAttackProfile';
import { type ProgressionProfile } from './ProgressionProfile';
import { type SpeedsProfile } from './SpeedsProfile';
import { type VitalsProfile } from './VitalsProfile';
import {
    TraitsPropfile,
    type ClassFeaturesProfile,
    type FeatsProfile,
    type ResistancesProfile,
    type SavesProfile,
    type SkillsProfile,
    type SpellPowerProfile,
    type StatsProfile,
} from './raw';
import { type Transform } from '@wowfinder/ts-utils';

type CreatureBaseProfile = {
    stats: StatsProfile;
    speeds: SpeedsProfile;
    vitals: VitalsProfile;
    skills: SkillsProfile;
    saves: SavesProfile;
    resistances: ResistancesProfile;
    features: ClassFeaturesProfile;
    feats: FeatsProfile;
    traits: TraitsPropfile;
};

// TODO: Consider full deprecation
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

type CreatureBaseProfileOverride = Transform<CreatureBaseProfile>;

export {
    type CreatureBaseProfile,
    type CreatureProfile,
    type CreatureBaseProfileOverride,
};
