import { DamageValue } from '../DamageValue';

import type { DamageComponentValueBuilder } from '../DamageComponent';
import { mockMindBurnFullDamageTypes } from '../../__mocks__';

describe('DamageValue', () => {
    const testDamageComponentValueBuilder: DamageComponentValueBuilder = {
        types: mockMindBurnFullDamageTypes,
        total: 10,
    };
    it('should initialize with the provided components', () => {
        const damageValue = new DamageValue({
            components: [testDamageComponentValueBuilder],
        });
        const components = damageValue.components;
        expect(components.length).toEqual(1);
        expect(components[0].types).toEqual(mockMindBurnFullDamageTypes);
        expect(components[0].total).toEqual(10);
    });
    it('should multiply all components by the provided multiplier', () => {
        const damageValue = new DamageValue({
            components: [testDamageComponentValueBuilder],
        });
        const multipliedDamageValue = damageValue.multiply(2);
        expect(multipliedDamageValue.components.length).toEqual(1);
        expect(multipliedDamageValue.components[0].total).toEqual(20);
    });
});
