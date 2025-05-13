import { MassUnit } from '@wowfinder/ts-enums';
import { Mass, convertMass } from '../Mass';
import { add } from '../Scalar';

describe('Mass', () => {
    it('should construct a mass object and convert to different units', () => {
        const mass = new Mass({ value: 1, unit: MassUnit.kilogram });
        expect(mass.value).toBe(1);
        expect(mass.unit).toBe(MassUnit.kilogram);
        expect(mass.convert(MassUnit.gram).value).toBe(1000);
        expect(mass.convert(MassUnit.pound).value).toBeCloseTo(2.20462);
        expect(mass.convert(MassUnit.ounce).value).toBeCloseTo(35.274);
    });
    it('should compute the correct number of pounds', () => {
        const mass = new Mass({ value: 1, unit: MassUnit.kilogram });
        expect(mass.pounds).toBeCloseTo(2.20462);
    });
    it('should compute the negative mass', () => {
        const mass = new Mass({ value: 1, unit: MassUnit.kilogram });
        const negativeMass = mass.negative;
        expect(negativeMass.value).toBe(-1);
        expect(negativeMass.unit).toBe(MassUnit.kilogram);
    });
    describe('asPounds', () => {
        it('should create a Mass object from a pound value', () => {
            const mass = Mass.asPounds(5);
            expect(mass.value).toBe(5);
            expect(mass.unit).toBe(MassUnit.pound);
        });
        it('should create a Mass object in pounds from another Mass object', () => {
            const input = new Mass({
                value: 32,
                unit: MassUnit.ounce,
            });
            const mass = Mass.asPounds(input);
            expect(mass.value).toBe(2);
            expect(mass.unit).toBe(MassUnit.pound);
        });
    });
    describe('tryParseMass', () => {
        it('should parse a valid metric mass', () => {
            const mass = Mass.tryParseMass('5kg');
            expect(mass?.value).toBe(5);
            expect(mass?.unit).toBe(MassUnit.kilogram);
        });
        it('should parse a valid imperial mass', () => {
            const mass = Mass.tryParseMass('5lb');
            expect(mass?.value).toBe(5);
            expect(mass?.unit).toBe(MassUnit.pound);
        });
        it('should parse a valid mass with spaces and full-unit name', () => {
            const mass = Mass.tryParseMass('5 pounds');
            expect(mass?.value).toBe(5);
            expect(mass?.unit).toBe(MassUnit.pound);
        });
        it('should return undefined for invalid input', () => {
            const mass = Mass.tryParseMass('invalid');
            expect(mass).toBeUndefined();
        });
    });
    describe('add', () => {
        it('should add two masses (imperial)', () => {
            const mass1 = new Mass({ value: 5, unit: MassUnit.pound });
            const mass2 = new Mass({ value: 16, unit: MassUnit.ounce });
            const sum = add(MassUnit.pound, convertMass, mass1, mass2);
            expect(sum.value).toBe(6);
            expect(sum.unit).toBe(MassUnit.pound);
        });
        it('should add two masses (metric)', () => {
            const mass1 = new Mass({ value: 5, unit: MassUnit.kilogram });
            const mass2 = new Mass({ value: 500, unit: MassUnit.gram });
            const sum = add(MassUnit.kilogram, convertMass, mass1, mass2);
            expect(sum.value).toBe(5.5);
            expect(sum.unit).toBe(MassUnit.kilogram);
        });
        it('should add two masses (mixed)', () => {
            const mass1 = new Mass({ value: 5, unit: MassUnit.kilogram });
            const mass2 = new Mass({ value: 16, unit: MassUnit.ounce });
            const sum = add(MassUnit.kilogram, convertMass, mass1, mass2);
            expect(sum.value).toBeCloseTo(5.45359);
            expect(sum.unit).toBe(MassUnit.kilogram);
        });
        it('should add zero masses', () => {
            const sum = add(MassUnit.kilogram, convertMass);
            expect(sum.value).toBe(0);
            expect(sum.unit).toBe(MassUnit.kilogram);
        });
        it('should add several masses', () => {
            const sum = add(
                MassUnit.kilogram,
                convertMass,
                new Mass({ value: 1, unit: MassUnit.kilogram }),
                new Mass({ value: 2, unit: MassUnit.kilogram }),
                new Mass({ value: 3, unit: MassUnit.kilogram }),
                new Mass({ value: 4, unit: MassUnit.kilogram }),
            );
            expect(sum.value).toBe(10);
            expect(sum.unit).toBe(MassUnit.kilogram);
        });
    });
});
