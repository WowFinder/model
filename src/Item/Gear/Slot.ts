import { GearSlot, type Shape } from '@wowfinder/ts-enums';

function compactShape(shape: Shape): Shape {
    const result: Shape = [];
    for (const slot of Object.keys(GearSlot) as GearSlot[]) {
        const quantity = shape
            .filter(entry => entry.slot === slot)
            .map(entry => entry.quantity)
            .reduce((a, b) => a + b, 0);
        if (quantity > 0) {
            result.push({ slot, quantity });
        }
    }
    return result;
}

const upperLimbs = (pairs = 1, fingersPerHand = 5): Shape => [
    { slot: GearSlot.shoulders, quantity: pairs },
    { slot: GearSlot.hands, quantity: pairs },
    { slot: GearSlot.wrists, quantity: pairs },
    { slot: GearSlot.mainHand, quantity: pairs },
    { slot: GearSlot.offHand, quantity: pairs },
    { slot: GearSlot.ring, quantity: 2 * pairs * fingersPerHand },
];

const lowerLimbs = (pairs = 1): Shape => [
    { slot: GearSlot.legs, quantity: pairs },
    { slot: GearSlot.feet, quantity: pairs },
];

const heads = (count = 1, earsPerHead = 2): Shape => [
    { slot: GearSlot.head, quantity: count },
    { slot: GearSlot.ear, quantity: count * earsPerHead },
];

const Shapes = {
    Humanoid: compactShape([
        ...heads(),
        { slot: GearSlot.neck, quantity: 1 },
        { slot: GearSlot.torso, quantity: 1 },
        { slot: GearSlot.back, quantity: 1 },
        { slot: GearSlot.waist, quantity: 1 },
        ...upperLimbs(),
        ...lowerLimbs(),
    ]),
};

function buildShape(slots: string[]): Shape {
    const slotCounts: { [s: string]: number } = {};
    for (const s of slots) {
        if (Object.hasOwn(GearSlot, s)) {
            slotCounts[s] = (slotCounts[s] || 0) + 1;
        } else {
            throw new Error(`Unknown gear slot ${s}`);
        }
    }
    return Object.keys(slotCounts).map(s => ({
        slot: s as GearSlot,
        quantity: slotCounts[s],
    }));
}

function entryGt0(entry: Shape[number]): boolean {
    return Math.floor(entry.quantity) > 0;
}

function explodeShape(shape: Shape): string[] {
    const res: string[] = [];
    for (const elem of shape.filter(entryGt0)) {
        res.push(...Array(elem.quantity).fill(elem.slot));
    }
    return res;
}

export { type Shape, Shapes, buildShape, compactShape, explodeShape };
