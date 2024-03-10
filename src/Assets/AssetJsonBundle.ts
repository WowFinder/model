import { AssetType } from '@wowfinder/ts-enums';

type AssetJsonBundle = {
    assets: {
        [AssetType.adventures]: { [k: string]: string };
        [AssetType.characters]: { [k: string]: string };
    };
};

export type { AssetJsonBundle };
