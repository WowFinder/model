import { AssetType } from '@wowfinder/ts-enums';
import type { AdventureExport } from '../Adventure';
import { CharacterExport } from '../Character';

type AssetBundle = {
    assets: {
        [AssetType.Adventures]: { [k: string]: AdventureExport };
        [AssetType.Characters]: { [k: string]: CharacterExport };
    };
};

export type { AssetBundle };
