import type { JsonValue } from '@wowfinder/ts-utils';
import type { DamageType } from '@wowfinder/ts-enums';
import type { ResistanceBreakdown } from './ResistanceBreakdown';

type ResistancesBuilder = { [key in DamageType]?: ResistanceBreakdown };

type ResistancesExport = {
    [key: string]: ResistanceBreakdown & { [key: string]: JsonValue };
};

type FullResistances = { [key in DamageType]: ResistanceBreakdown };

export type { ResistancesBuilder, ResistancesExport, FullResistances };
