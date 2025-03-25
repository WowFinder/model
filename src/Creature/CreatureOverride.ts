import type { RawStats } from '@wowfinder/asset-schemas';
import type { Overridable } from '@wowfinder/ts-utils';
import type { Race } from './Race';
import type { PersonalDetails } from './Personal';
import type { ClassEntries } from './Class/Class';

interface CreatureOverride {
    key: Overridable<string>;
    baseStats: Overridable<RawStats>;
    race: Overridable<Race>;
    notes: Overridable<string>;
    personal: Overridable<PersonalDetails>;
    classes: Overridable<ClassEntries>;
}

export type { CreatureOverride };
