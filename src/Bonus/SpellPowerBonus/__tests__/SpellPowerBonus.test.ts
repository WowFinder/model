import { SpellPowerBonus } from '../SpellPowerBonus';

import {
    modeFullBuilder,
    schoolFullBuilder,
    subSchoolFullBuilder,
} from '../../../__mocks__';
import { CastingMode, School, SubSchool } from '@wowfinder/ts-enums';

describe('SpellPowerBonus', () => {
    let defaultBonus: SpellPowerBonus;
    let fullBonus: SpellPowerBonus;
    beforeEach(() => {
        defaultBonus = new SpellPowerBonus({});
        fullBonus = new SpellPowerBonus({
            ...modeFullBuilder,
            ...schoolFullBuilder,
            ...subSchoolFullBuilder,
        });
    });

    it('should create a default instance', () => {
        expect(defaultBonus.isZero).toBe(true);
    });

    it('should create an instance with values', () => {
        expect(fullBonus.isZero).toBe(false);
        expect(fullBonus.mode(CastingMode.arcane)).toBe(1);
        expect(fullBonus.mode(CastingMode.divine)).toBe(2);
        expect(fullBonus.mode(CastingMode.spontaneous)).toBe(3);
        expect(fullBonus.school(School.abjuration)).toBe(1);
        expect(fullBonus.school(School.conjuration)).toBe(2);
        expect(fullBonus.school(School.divination)).toBe(3);
        expect(fullBonus.school(School.enchantment)).toBe(4);
        expect(fullBonus.school(School.evocation)).toBe(5);
        expect(fullBonus.school(School.illusion)).toBe(6);
        expect(fullBonus.school(School.necromancy)).toBe(7);
        expect(fullBonus.school(School.transmutation)).toBe(8);
        expect(fullBonus.school(School.universal)).toBe(9);
        expect(fullBonus.subSchool(SubSchool.void)).toBe(1);
        expect(fullBonus.subSchool(SubSchool.banish)).toBe(2);
        expect(fullBonus.subSchool(SubSchool.counter)).toBe(3);
        expect(fullBonus.subSchool(SubSchool.call)).toBe(4);
        expect(fullBonus.subSchool(SubSchool.celestial)).toBe(5);
        expect(fullBonus.subSchool(SubSchool.create)).toBe(6);
        expect(fullBonus.subSchool(SubSchool.heal)).toBe(7);
        expect(fullBonus.subSchool(SubSchool.summon)).toBe(8);
        expect(fullBonus.subSchool(SubSchool.teleport)).toBe(9);
        expect(fullBonus.subSchool(SubSchool.scry)).toBe(10);
        expect(fullBonus.subSchool(SubSchool.charm)).toBe(11);
        expect(fullBonus.subSchool(SubSchool.compel)).toBe(12);
        expect(fullBonus.subSchool(SubSchool.figment)).toBe(13);
        expect(fullBonus.subSchool(SubSchool.glamer)).toBe(14);
        expect(fullBonus.subSchool(SubSchool.phantom)).toBe(15);
        expect(fullBonus.subSchool(SubSchool.shadow)).toBe(16);
        expect(fullBonus.subSchool(SubSchool.enhancement)).toBe(17);
        expect(fullBonus.subSchool(SubSchool.polymorph)).toBe(18);
    });

    it('should return a zero object', () => {
        expect(SpellPowerBonus.zero.isZero).toBe(true);
    });

    it('should add bonuses together', () => {
        const sum = SpellPowerBonus.sum(fullBonus, fullBonus, fullBonus);
        expect(sum.mode(CastingMode.arcane)).toBe(3);
        expect(sum.school(School.conjuration)).toBe(6);
        expect(sum.school(School.necromancy)).toBe(21);
        expect(sum.subSchool(SubSchool.figment)).toBe(39);
        expect(sum.subSchool(SubSchool.polymorph)).toBe(54);
    });

    it('should return the maximum of the bonuses', () => {
        const max = SpellPowerBonus.max(defaultBonus, fullBonus);
        expect(max.mode(CastingMode.divine)).toBe(2);
        expect(max.school(School.abjuration)).toBe(1);
        expect(max.school(School.illusion)).toBe(6);
        expect(max.subSchool(SubSchool.celestial)).toBe(5);
        expect(max.subSchool(SubSchool.teleport)).toBe(9);
    });

    it('should multiply the bonuses by a factor', () => {
        const multiplied = SpellPowerBonus.multiply(fullBonus, 2);
        expect(multiplied.mode(CastingMode.spontaneous)).toBe(6);
        expect(multiplied.school(School.enchantment)).toBe(8);
        expect(multiplied.subSchool(SubSchool.charm)).toBe(22);
        expect(multiplied.subSchool(SubSchool.shadow)).toBe(32);
    });

    it('should yield zero when multiplying a zero bonus', () => {
        const multiplied = SpellPowerBonus.multiply(defaultBonus, 2);
        expect(multiplied.isZero).toBe(true);
    });

    it('should yield zero when multiplying by zero', () => {
        const multiplied = SpellPowerBonus.multiply(fullBonus, 0);
        expect(multiplied.isZero).toBe(true);
    });

    it('should export the bonus to a JSON-compatible object', () => {
        const exported = fullBonus.export();
        expect(exported).toEqual({
            ...modeFullBuilder,
            ...schoolFullBuilder,
            ...subSchoolFullBuilder,
        });
    });
});
