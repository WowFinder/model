import {
    mixedStatBlockMock,
    mockArmorValuesBuilder,
    mockFullArmorValuesBuilder,
    expectedTotalsForArmorValuesMocks,
} from '../../../__mocks__';
import { FullArmorValues } from '../FullArmorValues';

describe('FullArmorValues', () => {
    it('should build a FullArmorValues object with default values', () => {
        const fullArmorValues = new FullArmorValues({});
        expect(fullArmorValues.export()).toEqual(FullArmorValues.zero.export());
    });
    it('should build a FullArmorValues object with custom values', () => {
        const fullArmorValues = new FullArmorValues(mockFullArmorValuesBuilder);
        expect(fullArmorValues.gear).toEqual(1);
        expect(fullArmorValues.natural).toEqual(2);
        expect(fullArmorValues.deflection).toEqual(3);
        expect(fullArmorValues.misc).toEqual(4);
        expect(fullArmorValues.miscPhysical).toEqual(5);
        expect(fullArmorValues.miscEvasion).toEqual(6);
        expect(fullArmorValues.miscAll).toEqual(15);
        expect(fullArmorValues.temporary).toEqual(7);
        expect(fullArmorValues.temporaryPhysical).toEqual(8);
        expect(fullArmorValues.temporaryEvasion).toEqual(9);
        expect(fullArmorValues.temporaryAll).toEqual(24);
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
            expect(fullArmorValues.total).toEqual(53);
        });
    });
});
