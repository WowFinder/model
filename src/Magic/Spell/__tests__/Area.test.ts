import { LengthUnit } from '@wowfinder/ts-enums';
import { Length } from '../../../Scalar';
import {
    stringify,
    tryParseArea,
    parseArea,
    type SpellArea,
    type SpellAreaSelf,
    type SpellAreaPoint,
    type SpellAreaCone,
    type SpellAreaCube,
    type SpellAreaLine,
    type SpellAreaSphere,
} from '../Area';

function t(key: string, params?: Record<string, Length>): string {
    if (params && Object.keys(params).length) {
        return `${key} ${JSON.stringify(params)}`;
    }
    return key;
}

function mkLength(feet: number): Length {
    return new Length({ value: feet, unit: LengthUnit.foot });
}

describe('Area', () => {
    describe('stringify', () => {
        it('should stringify a value of subtype SpellAreaSelf', () => {
            const area: SpellAreaSelf = { spellAreaType: 'self' };
            const result = stringify(area, t);
            expect(result).toBe('magic.area.self');
        });
        it('should stringify a value of subtype SpellAreaPoint', () => {
            const area: SpellAreaPoint = { spellAreaType: 'point' };
            const result = stringify(area, t);
            expect(result).toBe('magic.area.point');
        });
        it('should stringify a value of subtype SpellAreaCone', () => {
            const area: SpellAreaCone = {
                spellAreaType: 'cone',
                radius: mkLength(5),
            };
            const result = stringify(area, t);
            expect(result).toBe('magic.area.cone {"radius":"5 units.foot"}');
        });
        it('should stringify a value of subtype SpellAreaCube', () => {
            const area: SpellAreaCube = {
                spellAreaType: 'cube',
                size: mkLength(5),
            };
            const result = stringify(area, t);
            expect(result).toBe('magic.area.cube {"size":"5 units.foot"}');
        });
        it('should stringify a value of subtype SpellAreaLine', () => {
            const area: SpellAreaLine = {
                spellAreaType: 'line',
                length: mkLength(5),
            };
            const result = stringify(area, t);
            expect(result).toBe('magic.area.line {"length":"5 units.foot"}');
        });
        it('should stringify a value of subtype SpellAreaSphere, self-centered', () => {
            const area: SpellAreaSphere = {
                spellAreaType: 'sphere',
                radius: mkLength(5),
                selfCentered: true,
            };
            const result = stringify(area, t);
            expect(result).toBe(
                'magic.area.sphere.self {"radius":"5 units.foot"}',
            );
        });
        it('should stringify a value of subtype SpellAreaSphere, point-centered', () => {
            const area: SpellAreaSphere = {
                spellAreaType: 'sphere',
                radius: mkLength(5),
                selfCentered: false,
            };
            const result = stringify(area, t);
            expect(result).toBe(
                'magic.area.sphere.point {"radius":"5 units.foot"}',
            );
        });
        it('should throw when attempting to stringify a value of an unknown subtype', () => {
            const area = { spellAreaType: 'unknown' } as unknown as SpellArea;
            expect(() => stringify(area, t)).toThrow();
        });
    });
    describe('tryParseArea', () => {
        it('should parse correctly the keyword value `self`', () => {
            const result = tryParseArea('self');
            expect(result).toEqual({ spellAreaType: 'self' });
        });
        it('should parse correctly the keyword value `point`', () => {
            const result = tryParseArea('point');
            expect(result).toEqual({ spellAreaType: 'point' });
        });
        it('should parse correctly a cone area value', () => {
            const result = tryParseArea('cone(15 foot)');
            expect(result).toEqual({
                spellAreaType: 'cone',
                radius: mkLength(15),
            });
        });
        it('should parse correctly a cube area value', () => {
            const result = tryParseArea('cube(20 foot)');
            expect(result).toEqual({
                spellAreaType: 'cube',
                size: mkLength(20),
            });
        });
        it('should parse correctly a line area value', () => {
            const result = tryParseArea('line(30 foot)');
            expect(result).toEqual({
                spellAreaType: 'line',
                length: mkLength(30),
            });
        });
        it('should parse correctly a sphere area value, self-centered', () => {
            const result = tryParseArea('sphere.self(40 foot)');
            expect(result).toEqual({
                spellAreaType: 'sphere',
                radius: mkLength(40),
                selfCentered: true,
            });
        });
        it('should parse correctly a sphere area value, point-centered', () => {
            const result = tryParseArea('sphere.point(50 foot)');
            expect(result).toEqual({
                spellAreaType: 'sphere',
                radius: mkLength(50),
                selfCentered: false,
            });
        });
        it('should return undefined when parsing an unknown keyword', () => {
            const result = tryParseArea('unknown');
            expect(result).toBeUndefined();
        });
        it('should return undefined when parsing an invalid format', () => {
            const result = tryParseArea('cone 15 foot');
            expect(result).toBeUndefined();
        });
        it('should return undefined when parsing a cone area with invalid radius', () => {
            const result = tryParseArea('cone(fifteen foot)');
            expect(result).toBeUndefined();
        });
        it('should return undefined when parsing a cube area with invalid size', () => {
            const result = tryParseArea('cube(twenty foot)');
            expect(result).toBeUndefined();
        });
        it('should return undefined when parsing a line area with invalid length', () => {
            const result = tryParseArea('line(thirty foot)');
            expect(result).toBeUndefined();
        });
        it('should return undefined when parsing a sphere area with invalid radius', () => {
            const result = tryParseArea('sphere.self(forty foot)');
            expect(result).toBeUndefined();
        });
    });
    describe('parseArea', () => {
        it('should parse a valid area string', () => {
            const result = parseArea('cone(15 foot)');
            expect(result).toEqual({
                spellAreaType: 'cone',
                radius: { ...mkLength(15) },
            });
            expect(result && stringify(result, t)).toBe(
                'magic.area.cone {"radius":"15 units.foot"}',
            );
        });
        it('should return the default area when parsing an invalid area string', () => {
            const defaultArea = { spellAreaType: 'self' } as const;
            const result = parseArea('invalid area', defaultArea);
            expect(result).toEqual(defaultArea);
        });
        it('should provide a default value for invalid strings when none is given', () => {
            const result = parseArea('invalid area');
            expect(Object.hasOwn(result, 'spellAreaType')).toBe(true);
        });
    });
});
