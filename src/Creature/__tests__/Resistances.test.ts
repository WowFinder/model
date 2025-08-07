import { mockDifferentFullResistances } from '../../__mocks__/Creature/Resistances';
import { breakdownByType } from '../Resistances';
import {
    fillResistances,
    fillPhysicalResistances,
    fillEnergyResistances,
    fillSpecialResistances,
} from '../Resistances/fill';
describe('Resistances', () => {
    describe('breakdownByType', () => {
        it('should return a breakdown of resistances by type', () => {
            const breakdown = breakdownByType(mockDifferentFullResistances);
            expect(breakdown.bludgeoning.total).toBe(6);
            expect(breakdown.slashing.total).toBe(12);
            expect(breakdown.piercing.total).toBe(18);
            expect(breakdown.arcane.total).toBe(24);
            expect(breakdown.fire.total).toBe(30);
            expect(breakdown.cold.total).toBe(36);
            expect(breakdown.nature.total).toBe(42);
            expect(breakdown.shadow.total).toBe(48);
            expect(breakdown.holy.total).toBe(54);
            expect(breakdown.psychic.total).toBe(60);
        });
    });
    describe('fill helper methods', () => {
        describe('fillPhysicalResistances', () => {
            it('should fill physical resistances with default values', () => {
                const filled = fillPhysicalResistances({});
                expect(filled).toEqual({
                    bludgeoning: 0,
                    slashing: 0,
                    piercing: 0,
                });
            });

            it('should fill physical resistances with provided values', () => {
                const filled = fillPhysicalResistances({ slashing: 10 }, 5);
                expect(filled).toEqual({
                    bludgeoning: 5,
                    slashing: 10,
                    piercing: 5,
                });
            });
        });
        describe('fillEnergyResistances', () => {
            it('should fill energy resistances with default values', () => {
                const filled = fillEnergyResistances({});
                expect(filled).toEqual({
                    arcane: 0,
                    fire: 0,
                    cold: 0,
                    nature: 0,
                    shadow: 0,
                    holy: 0,
                });
            });

            it('should fill energy resistances with provided values', () => {
                const filled = fillEnergyResistances(
                    { fire: 10, shadow: 15 },
                    5,
                );
                expect(filled).toEqual({
                    arcane: 5,
                    fire: 10,
                    cold: 5,
                    nature: 5,
                    shadow: 15,
                    holy: 5,
                });
            });
        });
        describe('fillSpecialResistances', () => {
            it('should fill special resistances with default values', () => {
                const filled = fillSpecialResistances({});
                expect(filled).toEqual({
                    psychic: 0,
                });
            });

            it('should fill special resistances with provided values', () => {
                const filled = fillSpecialResistances({}, 10);
                expect(filled).toEqual({
                    psychic: 10,
                });
            });

            it('should not override existing values', () => {
                const filled = fillSpecialResistances({ psychic: 20 }, 10);
                expect(filled).toEqual({
                    psychic: 20,
                });
            });
        });
        describe('fillResistances', () => {
            it('should fill all resistances with default values', () => {
                const filled = fillResistances({});
                expect(filled).toEqual({
                    bludgeoning: 0,
                    slashing: 0,
                    piercing: 0,
                    arcane: 0,
                    fire: 0,
                    cold: 0,
                    nature: 0,
                    shadow: 0,
                    holy: 0,
                    psychic: 0,
                });
            });

            it('should fill all resistances with provided values', () => {
                const filled = fillResistances({ fire: 10, psychic: 15 }, 5);
                expect(filled).toEqual({
                    bludgeoning: 5,
                    slashing: 5,
                    piercing: 5,
                    arcane: 5,
                    fire: 10,
                    cold: 5,
                    nature: 5,
                    shadow: 5,
                    holy: 5,
                    psychic: 15,
                });
            });
        });
    });
});
