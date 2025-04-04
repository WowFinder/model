import type { RawSaves } from '@wowfinder/asset-schemas';
import { Save } from '@wowfinder/ts-enums';

const zeroSave = {
    fortitude: 0,
    reflexes: 0,
    will: 0,
};

function fillSaves(saves?: Partial<RawSaves>): RawSaves {
    return {
        ...zeroSave,
        ...(saves ?? {}),
    };
}

type Saves = {
    [key in Save]: number;
};

export { zeroSave, fillSaves, type Saves };
