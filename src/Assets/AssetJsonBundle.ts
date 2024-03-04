import { AssetType } from '@wowfinder/ts-enums';

type AssetJsonBundle = {
    assets: {
        [AssetType.Adventures]: { [k: string]: string };
        [AssetType.Characters]: { [k: string]: string };
    };
};

export type { AssetJsonBundle };
