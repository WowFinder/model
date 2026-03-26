import { type RawCharacterAsset } from '@wowfinder/asset-schemas';
import { rawBaseCreatureMinimal, rawBaseCreatureExpanded } from '../Creature';

const rawCharacterMinimal: RawCharacterAsset = {
    ...rawBaseCreatureMinimal,
    key: 'character-mock-minimal',
} as const;

const rawCharacterExpanded: RawCharacterAsset = {
    ...rawBaseCreatureExpanded,
    key: 'character-mock-expanded',
    active: false,
} as const;

export { rawCharacterMinimal, rawCharacterExpanded };
