import { SchoolSpellPowerBonus } from '../SchoolSpellPowerBonus';
import { schoolDefaultBuilder, schoolFullBuilder } from '../../../__mocks__';

describe('SchoolSpellPowerBonus', () => {
    let defaultBonus: SchoolSpellPowerBonus;
    let fullBonus: SchoolSpellPowerBonus;

    beforeEach(() => {
        defaultBonus = new SchoolSpellPowerBonus(schoolDefaultBuilder);
        fullBonus = new SchoolSpellPowerBonus(schoolFullBuilder);
    });

    it('should create a default instance', () => {
        expect(defaultBonus.abjuration).toBe(0);
        expect(defaultBonus.conjuration).toBe(0);
        expect(defaultBonus.divination).toBe(0);
        expect(defaultBonus.enchantment).toBe(0);
        expect(defaultBonus.evocation).toBe(0);
        expect(defaultBonus.illusion).toBe(0);
        expect(defaultBonus.necromancy).toBe(0);
        expect(defaultBonus.transmutation).toBe(0);
        expect(defaultBonus.universal).toBe(0);
        expect(defaultBonus.isZero).toBe(true);
    });

    it('should create an instance with values', () => {
        expect(fullBonus.abjuration).toBe(1);
        expect(fullBonus.conjuration).toBe(2);
        expect(fullBonus.divination).toBe(3);
        expect(fullBonus.enchantment).toBe(4);
        expect(fullBonus.evocation).toBe(5);
        expect(fullBonus.illusion).toBe(6);
        expect(fullBonus.necromancy).toBe(7);
        expect(fullBonus.transmutation).toBe(8);
        expect(fullBonus.universal).toBe(9);
        expect(fullBonus.isZero).toBe(false);
    });

    it('should return a zero object', () => {
        expect(SchoolSpellPowerBonus.zero.isZero).toBe(true);
    });

    it('should add bonuses together', () => {
        const sum = SchoolSpellPowerBonus.sum(fullBonus, fullBonus, fullBonus);
        expect(sum.abjuration).toBe(3);
        expect(sum.conjuration).toBe(6);
        expect(sum.divination).toBe(9);
        expect(sum.enchantment).toBe(12);
        expect(sum.evocation).toBe(15);
        expect(sum.illusion).toBe(18);
        expect(sum.necromancy).toBe(21);
        expect(sum.transmutation).toBe(24);
        expect(sum.universal).toBe(27);
    });

    it('should return the maximum of the bonuses', () => {
        const max = SchoolSpellPowerBonus.max(defaultBonus, fullBonus);
        expect(max.abjuration).toBe(1);
        expect(max.conjuration).toBe(2);
        expect(max.divination).toBe(3);
        expect(max.enchantment).toBe(4);
        expect(max.evocation).toBe(5);
        expect(max.illusion).toBe(6);
        expect(max.necromancy).toBe(7);
        expect(max.transmutation).toBe(8);
        expect(max.universal).toBe(9);
    });

    it('should multiply the bonuses by a factor', () => {
        const multiplied = SchoolSpellPowerBonus.multiply(fullBonus, 2);
        expect(multiplied.abjuration).toBe(2);
        expect(multiplied.conjuration).toBe(4);
        expect(multiplied.divination).toBe(6);
        expect(multiplied.enchantment).toBe(8);
        expect(multiplied.evocation).toBe(10);
        expect(multiplied.illusion).toBe(12);
        expect(multiplied.necromancy).toBe(14);
        expect(multiplied.transmutation).toBe(16);
        expect(multiplied.universal).toBe(18);
    });

    it('should yield zero when multiplying a zero bonus', () => {
        const multiplied = SchoolSpellPowerBonus.multiply(defaultBonus, 2);
        expect(multiplied.isZero).toBe(true);
    });

    it('should yield zero when multiplying by zero', () => {
        const multiplied = SchoolSpellPowerBonus.multiply(fullBonus, 0);
        expect(multiplied.isZero).toBe(true);
    });

    it('should export the bonus to a JSON-compatible object', () => {
        expect(fullBonus.export()).toEqual(schoolFullBuilder);
    });
});
