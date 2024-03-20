import {
    mixedStatBlockMock,
    mockArmorValuesBuilder,
    mockFullArmorValuesBuilder,
    expectedTotalsForArmorValuesMocks,
} from '__mocks__';
import { FullArmorValues } from '../FullArmorValues';

describe('FullArmorValues', () => {
    it('should build a FullArmorValues object with default values', () => {
        const fullArmorValues = new FullArmorValues({});
        expect(fullArmorValues.export()).toEqual(FullArmorValues.zero.export());
    });
    it('should build a FullArmorValues object with custom values', () => {
        const fullArmorValues = new FullArmorValues(mockFullArmorValuesBuilder);
        expect(fullArmorValues.armor).toEqual(1);
        expect(fullArmorValues.shield).toEqual(2);
        expect(fullArmorValues.dodge).toEqual(3);
        expect(fullArmorValues.natural).toEqual(4);
        expect(fullArmorValues.deflection).toEqual(5);
        expect(fullArmorValues.misc).toEqual(6);
        expect(fullArmorValues.miscPhysical).toEqual(7);
        expect(fullArmorValues.miscEvasion).toEqual(8);
        expect(fullArmorValues.miscAll).toEqual(21);
        expect(fullArmorValues.temporary).toEqual(9);
        expect(fullArmorValues.temporaryPhysical).toEqual(10);
        expect(fullArmorValues.temporaryEvasion).toEqual(11);
        expect(fullArmorValues.temporaryAll).toEqual(30);
        expect(fullArmorValues.strength).toEqual(-1);
        expect(fullArmorValues.dexterity).toEqual(-2);
        expect(fullArmorValues.baseAttack).toEqual(12);
        expect(fullArmorValues.size).toEqual(-3);
    });
    it('should compute correct totals', () => {
        const fullArmorValues = new FullArmorValues(mockFullArmorValuesBuilder);
        expect(fullArmorValues.total).toEqual(
            expectedTotalsForArmorValuesMocks.total,
        );
        expect(fullArmorValues.flatFooted.total).toEqual(
            expectedTotalsForArmorValuesMocks.flatFooted,
        );
        expect(fullArmorValues.touch.total).toEqual(
            expectedTotalsForArmorValuesMocks.touch,
        );
        expect(fullArmorValues.maneuverDefense).toEqual(
            expectedTotalsForArmorValuesMocks.maneuverDefense,
        );
        expect(fullArmorValues.maneuverDefenseFlatFooted).toEqual(
            expectedTotalsForArmorValuesMocks.maneuverDefenseFlatFooted,
        );
    });
    describe('export', () => {
        it('should return a FullArmorValuesBuilder object', () => {
            const fullArmorValues = new FullArmorValues(
                mockFullArmorValuesBuilder,
            );
            expect(fullArmorValues.export()).toEqual(
                mockFullArmorValuesBuilder,
            );
        });
    });
    describe('fromBaseValues', () => {
        it('should build a FullArmorValues object from base values', () => {
            const fullArmorValues = FullArmorValues.fromBaseValues({
                base: mockArmorValuesBuilder,
                stats: mixedStatBlockMock,
                baseAttack: mockFullArmorValuesBuilder.baseAttack ?? 0,
                size: mockFullArmorValuesBuilder.size ?? 0,
            });
            expect(fullArmorValues.total).toEqual(74);
        });
    });
});
