import { SpeedsModifiersBonus } from '../SpeedsModifiersBonus';

import {
    defaultSpeedsModifiersBonusBuilder,
    fullSpeedsModifiersBonusBuilder,
} from '__mocks__';

describe('SpeedsModifiersBonus', () => {
    let defaultSpeedsModifiersBonus: SpeedsModifiersBonus;
    let fullSpeedsModifiersBonus: SpeedsModifiersBonus;

    beforeEach(() => {
        defaultSpeedsModifiersBonus = new SpeedsModifiersBonus(
            defaultSpeedsModifiersBonusBuilder,
        );
        fullSpeedsModifiersBonus = new SpeedsModifiersBonus(
            fullSpeedsModifiersBonusBuilder,
        );
    });

    it('should construct a default bonus', () => {
        expect(defaultSpeedsModifiersBonus.isZero).toBe(true);
        expect(defaultSpeedsModifiersBonus.base).toBe(0);
        expect(defaultSpeedsModifiersBonus.burrow).toBe(0);
        expect(defaultSpeedsModifiersBonus.climb).toBe(0);
        expect(defaultSpeedsModifiersBonus.swim).toBe(0);
        expect(defaultSpeedsModifiersBonus.fly).toBe(0);
    });

    it('should construct a full bonus', () => {
        expect(fullSpeedsModifiersBonus.isZero).toBe(false);
        expect(fullSpeedsModifiersBonus.base).toBe(5);
        expect(fullSpeedsModifiersBonus.burrow).toBe(10);
        expect(fullSpeedsModifiersBonus.climb).toBe(15);
        expect(fullSpeedsModifiersBonus.swim).toBe(20);
        expect(fullSpeedsModifiersBonus.fly).toBe(25);
    });

    it('should return a zero bonus', () => {
        expect(SpeedsModifiersBonus.zero.isZero).toBe(true);
    });

    it('should sum bonuses', () => {
        const sumBonus = SpeedsModifiersBonus.sum(
            defaultSpeedsModifiersBonus,
            fullSpeedsModifiersBonus,
            fullSpeedsModifiersBonus,
        );
        expect(sumBonus.base).toBe(10);
        expect(sumBonus.burrow).toBe(20);
        expect(sumBonus.climb).toBe(30);
        expect(sumBonus.swim).toBe(40);
        expect(sumBonus.fly).toBe(50);
    });

    it('should get the maximum bonus', () => {
        const maxBonus = SpeedsModifiersBonus.max(
            defaultSpeedsModifiersBonus,
            fullSpeedsModifiersBonus,
        );
        expect(maxBonus.base).toBe(5);
        expect(maxBonus.burrow).toBe(10);
        expect(maxBonus.climb).toBe(15);
        expect(maxBonus.swim).toBe(20);
        expect(maxBonus.fly).toBe(25);
    });

    it('should multiply a bonus', () => {
        const factor = 2;
        const multipliedBonus = SpeedsModifiersBonus.multiply(
            fullSpeedsModifiersBonus,
            factor,
        );
        expect(multipliedBonus.base).toBe(10);
        expect(multipliedBonus.burrow).toBe(20);
        expect(multipliedBonus.climb).toBe(30);
        expect(multipliedBonus.swim).toBe(40);
        expect(multipliedBonus.fly).toBe(50);
    });

    it('should export a bonus', () => {
        const exportedBonus = fullSpeedsModifiersBonus.export();
        expect(exportedBonus).toEqual({
            base: 5,
            burrow: 10,
            climb: 15,
            swim: 20,
            fly: 25,
        });
    });
});
