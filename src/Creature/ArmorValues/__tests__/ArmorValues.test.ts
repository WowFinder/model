import { ArmorValues } from '../ArmorValues';
import { mockArmorValuesBuilder } from '../../../__mocks__';

describe('ArmorValues', () => {
    it('should build an ArmorValues object with default values', () => {
        const armorValues = new ArmorValues({});
        expect(armorValues.export()).toEqual(ArmorValues.zero.export());
    });
    it('should build an ArmorValues object with custom values', () => {
        const armorValues = new ArmorValues(mockArmorValuesBuilder);
        expect(armorValues.gear).toEqual(1);
        expect(armorValues.natural).toEqual(2);
        expect(armorValues.deflection).toEqual(3);
        expect(armorValues.misc).toEqual(4);
        expect(armorValues.miscPhysical).toEqual(5);
        expect(armorValues.miscEvasion).toEqual(6);
        expect(armorValues.miscAll).toEqual(15);
        expect(armorValues.temporary).toEqual(7);
        expect(armorValues.temporaryPhysical).toEqual(8);
        expect(armorValues.temporaryEvasion).toEqual(9);
        expect(armorValues.temporaryAll).toEqual(24);
    });
    describe('export', () => {
        it('should return an ArmorValuesBuilder object', () => {
            const armorValues = new ArmorValues(mockArmorValuesBuilder);
            expect(armorValues.export()).toEqual(mockArmorValuesBuilder);
        });
    });
});
