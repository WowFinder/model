import { AssetType } from '@wowfinder/ts-enums';
import type { AdventureExport } from '../Adventure';
import { CharacterExport } from '../Character';

type AssetBundle = {
    assets: {
        [AssetType.adventures]: { [k: string]: AdventureExport };
        [AssetType.characters]: { [k: string]: CharacterExport };
    };
};

export type { AssetBundle };
