import { Size } from '@wowfinder/ts-enums';

function sizeCombatMod(size: Size): number {
    switch (size) {
        case -4:
            return -8;
        case -3:
            return -4;
        case 3:
            return 4;
        case 4:
            return 8;
        default:
            return size;
    }
}

function parseSize(raw?: number): Size | undefined {
    for (const size of Object.values(Size)) {
        if (size === raw) {
            return size;
        }
    }
    return undefined;
}

export { sizeCombatMod, parseSize };
