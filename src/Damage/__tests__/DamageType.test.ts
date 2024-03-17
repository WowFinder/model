import { DamageType } from '@wowfinder/ts-enums';
import { buildFullDamageTypes, makeFullDamageTypes } from '../DamageType';
import {
    mockMindBurnFullDamageTypes,
    mockMindBurnPartialDamageTypes,
} from '__mocks__';
describe('DamageType', () => {
    describe('makeFullDamageTypes', () => {
        it('should build a full damage type', () => {
            const types = makeFullDamageTypes(
                DamageType.bludgeoning,
                DamageType.fire,
            );
            expect(types.bludgeoning).toBe(true);
            expect(types.fire).toBe(true);
            expect(types.cold).toBe(false);
        });
    });
    describe('buildFullDamageTypes', () => {
        it('should build a full damage type', () => {
            const types = buildFullDamageTypes(mockMindBurnPartialDamageTypes);
            expect(types.bludgeoning).toBe(true);
            expect(types.fire).toBe(true);
            expect(types.cold).toBe(false);
            expect(types).toEqual(mockMindBurnFullDamageTypes);
        });
    });
});
