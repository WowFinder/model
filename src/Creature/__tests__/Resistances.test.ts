import { mockDifferentFullResistances } from '../../__mocks__/Creature/Resistances';
import { breakdownByType } from '../Resistances';
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
});
