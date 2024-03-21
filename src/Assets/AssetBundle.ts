/* eslint-disable deprecation/deprecation */
import type { AssetType } from '@wowfinder/ts-enums';
import type { AdventureExport } from '../Adventure';
import type { CharacterExport } from '../Character';

/** @deprecated */
type AssetBundle = {
    assets: {
        [AssetType.adventures]: { [k: string]: AdventureExport };
        [AssetType.characters]: { [k: string]: CharacterExport };
    };
};

export type { AssetBundle };
