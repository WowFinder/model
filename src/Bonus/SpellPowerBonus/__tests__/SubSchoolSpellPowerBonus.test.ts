import { SubSchoolSpellPowerBonus } from '../SubSchoolSpellPowerBonus';
import {
    subSchoolDefaultBuilder,
    subSchoolFullBuilder,
} from '../../../__mocks__';

describe('SubSchoolSpellPowerBonus', () => {
    let defaultBonus: SubSchoolSpellPowerBonus;
    let fullBonus: SubSchoolSpellPowerBonus;

    beforeEach(() => {
        defaultBonus = new SubSchoolSpellPowerBonus(subSchoolDefaultBuilder);
        fullBonus = new SubSchoolSpellPowerBonus(subSchoolFullBuilder);
    });

    it('should create a default instance', () => {
        expect(defaultBonus.void).toBe(0);
        expect(defaultBonus.banish).toBe(0);
        expect(defaultBonus.counter).toBe(0);
        expect(defaultBonus.call).toBe(0);
        expect(defaultBonus.celestial).toBe(0);
        expect(defaultBonus.create).toBe(0);
        expect(defaultBonus.heal).toBe(0);
        expect(defaultBonus.summon).toBe(0);
        expect(defaultBonus.teleport).toBe(0);
        expect(defaultBonus.scry).toBe(0);
        expect(defaultBonus.charm).toBe(0);
        expect(defaultBonus.compel).toBe(0);
        expect(defaultBonus.figment).toBe(0);
        expect(defaultBonus.glamer).toBe(0);
        expect(defaultBonus.phantom).toBe(0);
        expect(defaultBonus.shadow).toBe(0);
        expect(defaultBonus.enhancement).toBe(0);
        expect(defaultBonus.polymorph).toBe(0);
        expect(defaultBonus.isZero).toBe(true);
    });

    it('should create an instance with values', () => {
        expect(fullBonus.void).toBe(1);
        expect(fullBonus.banish).toBe(2);
        expect(fullBonus.counter).toBe(3);
        expect(fullBonus.call).toBe(4);
        expect(fullBonus.celestial).toBe(5);
        expect(fullBonus.create).toBe(6);
        expect(fullBonus.heal).toBe(7);
        expect(fullBonus.summon).toBe(8);
        expect(fullBonus.teleport).toBe(9);
        expect(fullBonus.scry).toBe(10);
        expect(fullBonus.charm).toBe(11);
        expect(fullBonus.compel).toBe(12);
        expect(fullBonus.figment).toBe(13);
        expect(fullBonus.glamer).toBe(14);
        expect(fullBonus.phantom).toBe(15);
        expect(fullBonus.shadow).toBe(16);
        expect(fullBonus.enhancement).toBe(17);
        expect(fullBonus.polymorph).toBe(18);
        expect(fullBonus.isZero).toBe(false);
    });

    it('should return a zero object', () => {
        expect(SubSchoolSpellPowerBonus.zero.isZero).toBe(true);
    });

    it('should add bonuses together', () => {
        const sum = SubSchoolSpellPowerBonus.sum(
            fullBonus,
            fullBonus,
            fullBonus,
        );
        expect(sum.void).toBe(3);
        expect(sum.banish).toBe(6);
        expect(sum.counter).toBe(9);
        expect(sum.call).toBe(12);
        expect(sum.celestial).toBe(15);
        expect(sum.create).toBe(18);
        expect(sum.heal).toBe(21);
        expect(sum.summon).toBe(24);
        expect(sum.teleport).toBe(27);
        expect(sum.scry).toBe(30);
        expect(sum.charm).toBe(33);
        expect(sum.compel).toBe(36);
        expect(sum.figment).toBe(39);
        expect(sum.glamer).toBe(42);
        expect(sum.phantom).toBe(45);
        expect(sum.shadow).toBe(48);
        expect(sum.enhancement).toBe(51);
        expect(sum.polymorph).toBe(54);
    });

    it('should return the maximum of the bonuses', () => {
        const max = SubSchoolSpellPowerBonus.max(defaultBonus, fullBonus);
        expect(max.void).toBe(1);
        expect(max.banish).toBe(2);
        expect(max.counter).toBe(3);
        expect(max.call).toBe(4);
        expect(max.celestial).toBe(5);
        expect(max.create).toBe(6);
        expect(max.heal).toBe(7);
        expect(max.summon).toBe(8);
        expect(max.teleport).toBe(9);
        expect(max.scry).toBe(10);
        expect(max.charm).toBe(11);
        expect(max.compel).toBe(12);
        expect(max.figment).toBe(13);
        expect(max.glamer).toBe(14);
        expect(max.phantom).toBe(15);
        expect(max.shadow).toBe(16);
        expect(max.enhancement).toBe(17);
        expect(max.polymorph).toBe(18);
    });

    it('should multiply the bonuses by a factor', () => {
        const multiplied = SubSchoolSpellPowerBonus.multiply(fullBonus, 2);
        expect(multiplied.void).toBe(2);
        expect(multiplied.banish).toBe(4);
        expect(multiplied.counter).toBe(6);
        expect(multiplied.call).toBe(8);
        expect(multiplied.celestial).toBe(10);
        expect(multiplied.create).toBe(12);
        expect(multiplied.heal).toBe(14);
        expect(multiplied.summon).toBe(16);
        expect(multiplied.teleport).toBe(18);
        expect(multiplied.scry).toBe(20);
        expect(multiplied.charm).toBe(22);
        expect(multiplied.compel).toBe(24);
        expect(multiplied.figment).toBe(26);
        expect(multiplied.glamer).toBe(28);
        expect(multiplied.phantom).toBe(30);
        expect(multiplied.shadow).toBe(32);
        expect(multiplied.enhancement).toBe(34);
        expect(multiplied.polymorph).toBe(36);
    });

    it('should yield zero when multiplying a zero bonus', () => {
        const multiplied = SubSchoolSpellPowerBonus.multiply(defaultBonus, 2);
        expect(multiplied.isZero).toBe(true);
    });

    it('should yield zero when multiplying by zero', () => {
        const multiplied = SubSchoolSpellPowerBonus.multiply(fullBonus, 0);
        expect(multiplied.isZero).toBe(true);
    });

    it('should export the bonus to a JSON-compatible object', () => {
        expect(fullBonus.export()).toEqual(subSchoolFullBuilder);
    });
});
