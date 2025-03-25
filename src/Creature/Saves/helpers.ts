import type { RawSaves } from '@wowfinder/asset-schemas';

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

export { zeroSave, fillSaves };
