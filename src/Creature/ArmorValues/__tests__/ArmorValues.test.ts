import { ArmorValues } from '../ArmorValues';
import { mockArmorValuesBuilder } from '../../../__mocks__';

describe('ArmorValues', () => {
    it('should build an ArmorValues object with default values', () => {
        const armorValues = new ArmorValues({});
        expect(armorValues.export()).toEqual(ArmorValues.zero.export());
    });
    it('should build an ArmorValues object with custom values', () => {
        const armorValues = new ArmorValues(mockArmorValuesBuilder);
        expect(armorValues.armor).toEqual(1);
        expect(armorValues.shield).toEqual(2);
        expect(armorValues.dodge).toEqual(3);
        expect(armorValues.natural).toEqual(4);
        expect(armorValues.deflection).toEqual(5);
        expect(armorValues.misc).toEqual(6);
        expect(armorValues.miscPhysical).toEqual(7);
        expect(armorValues.miscEvasion).toEqual(8);
        expect(armorValues.miscAll).toEqual(21);
        expect(armorValues.temporary).toEqual(9);
        expect(armorValues.temporaryPhysical).toEqual(10);
        expect(armorValues.temporaryEvasion).toEqual(11);
        expect(armorValues.temporaryAll).toEqual(30);
    });
    describe('export', () => {
        it('should return an ArmorValuesBuilder object', () => {
            const armorValues = new ArmorValues(mockArmorValuesBuilder);
            expect(armorValues.export()).toEqual(mockArmorValuesBuilder);
        });
    });
});
