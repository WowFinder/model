import { GearSlot } from '@wowfinder/ts-enums';
import { type Shape, Shapes, buildShape, compactShape, explodeShape } from '../Slot';

describe('Slot methods', () => {
    describe('Shapes constants', () => {
        it('should have a Humanoid shape with expected slots and quantities', () => {
            const humanoid = Shapes.Humanoid;
            const expectedSlots = [
                { slot: GearSlot.head, quantity: 1 },
                { slot: GearSlot.ear, quantity: 2 },
                { slot: GearSlot.neck, quantity: 1 },
                { slot: GearSlot.torso, quantity: 1 },
                { slot: GearSlot.back, quantity: 1 },
                { slot: GearSlot.waist, quantity: 1 },
                { slot: GearSlot.shoulders, quantity: 1 },
                { slot: GearSlot.hands, quantity: 1 },
                { slot: GearSlot.wrists, quantity: 1 },
                { slot: GearSlot.mainHand, quantity: 1 },
                { slot: GearSlot.offHand, quantity: 1 },
                { slot: GearSlot.legs, quantity: 1 },
                { slot: GearSlot.feet, quantity: 1 },
                { slot: GearSlot.ring, quantity: 10 },
            ];
            for (const entry of expectedSlots) {
                const found = humanoid.find(e => e.slot === entry.slot);
                expect(found).toBeDefined();
                expect(found!.quantity).toBe(entry.quantity);
            }
            expect(humanoid.length).toBe(expectedSlots.length);
        });
    });
    describe('buildShape', () => {
        it('should build a shape from a list of slot names', () => {
            const input = [
                'head',
                'head',
                'mainHand',
                'ring',
                'ring',
                'ring',
            ];
            const expected: Shape = [
                { slot: GearSlot.head, quantity: 2 },
                { slot: GearSlot.mainHand, quantity: 1 },
                { slot: GearSlot.ring, quantity: 3 },
            ];
            const built = buildShape(input);
            for (const entry of expected) {
                const found = built.find(e => e.slot === entry.slot);
                expect(found).toBeDefined();
                expect(found!.quantity).toBe(entry.quantity);
            }
            expect(built.length).toBe(expected.length);
        });
        it('should throw an error for unknown slots', () => {
            expect(() => buildShape(['unknown'])).toThrow('Unknown gear slot unknown');
        });
    });
    describe('compactShape', () => {
        it('should compact a shape by summing quantities of the same slot and discarding zeroes', () => {
            const input: Shape = [
                { slot: GearSlot.head, quantity: 1 },
                { slot: GearSlot.head, quantity: 2 },
                { slot: GearSlot.mainHand, quantity: 1 },
                { slot: GearSlot.ring, quantity: 3 },
                { slot: GearSlot.ring, quantity: 2 },
                { slot: GearSlot.ring, quantity: 0 },
                { slot: GearSlot.offHand, quantity: 0 },
            ];
            const expected: Shape = [
                { slot: GearSlot.head, quantity: 3 },
                { slot: GearSlot.mainHand, quantity: 1 },
                { slot: GearSlot.ring, quantity: 5 },
            ];
            const compacted = compactShape(input);
            for (const entry of expected) {
                const found = compacted.find(e => e.slot === entry.slot);
                expect(found).toBeDefined();
                expect(found!.quantity).toBe(entry.quantity);
            }
            expect(compacted.length).toBe(expected.length);
        });
    });
    describe('explodeShape', () => {
        it('should explode a shape into a list of slot names according to quantities', () => {
            const input: Shape = [
                { slot: GearSlot.head, quantity: 2 },
                { slot: GearSlot.mainHand, quantity: 1 },
                { slot: GearSlot.ring, quantity: 3 },
            ];
            const expected = [
                'head',
                'head',
                'mainHand',
                'ring',
                'ring',
                'ring',
            ];
            const exploded = explodeShape(input);
            expect(exploded).toEqual(expected);
        });
        it('should ignore slots with zero quantity', () => {
            const input: Shape = [
                { slot: GearSlot.head, quantity: 2 },
                { slot: GearSlot.mainHand, quantity: 0 },
                { slot: GearSlot.ring, quantity: 3 },
            ];
            const expected = [
                'head',
                'head',
                'ring',
                'ring',
                'ring',
            ];
            const exploded = explodeShape(input);
            expect(exploded).toEqual(expected);
        });
    });
});