import { Debugger, Stringifier } from '@wowfinder/ts-utils';
import { Length } from '../../Scalar';

type SpellAreaSelf = {
    spellAreaType: 'self';
};

type SpellAreaPoint = {
    spellAreaType: 'point';
};

type SpellAreaCone = {
    spellAreaType: 'cone';
    radius: Length;
};

type SpellAreaCube = {
    spellAreaType: 'cube';
    size: Length;
};

type SpellAreaLine = {
    spellAreaType: 'line';
    length: Length;
};

type SpellAreaSphere = {
    spellAreaType: 'sphere';
    radius: Length;
    selfCentered: boolean;
};

type SpellArea =
    | SpellAreaSelf
    | SpellAreaPoint
    | SpellAreaCone
    | SpellAreaCube
    | SpellAreaLine
    | SpellAreaSphere;

function stringify(
    value: SpellArea,
    t: Parameters<Stringifier<SpellArea>>[1],
): string {
    switch (value.spellAreaType) {
        case 'self':
            return t('magic.area.self');
        case 'point':
            return t('magic.area.point');
        case 'cone':
            return t('magic.area.cone', { radius: value.radius.toString(t) });
        case 'cube':
            return t('magic.area.cube', { size: value.size.toString(t) });
        case 'line':
            return t('magic.area.line', { length: value.length.toString(t) });
        case 'sphere': {
            const suffix = value.selfCentered ? 'self' : 'point';
            return t(`magic.area.sphere.${suffix}`, {
                radius: value.radius.toString(t),
            });
        }
        default: {
            return Debugger.unreachable(value);
        }
    }
}

const partialParsers = {
    cone: (length?: Length): SpellAreaCone | undefined =>
        length ? { spellAreaType: 'cone', radius: length } : undefined,
    cube: (length?: Length): SpellAreaCube | undefined =>
        length ? { spellAreaType: 'cube', size: length } : undefined,
    line: (length?: Length): SpellAreaLine | undefined =>
        length ? { spellAreaType: 'line', length } : undefined,
    sphere: {
        base:
            (selfCentered: boolean) =>
            (length?: Length): SpellAreaSphere | undefined =>
                length
                    ? {
                          spellAreaType: 'sphere',
                          radius: length,
                          selfCentered,
                      }
                    : undefined,
        point: (length?: Length): SpellAreaSphere | undefined =>
            partialParsers.sphere.base(false)(length),
        self: (length?: Length): SpellAreaSphere | undefined =>
            partialParsers.sphere.base(true)(length),
    },
};

function tryParseArea(input: string): SpellArea | undefined {
    const matches = /^([a-z.]+)\s*(?:\((.*)\))?$/.exec(input.toLowerCase());
    if (!matches) {
        return undefined;
    }
    const [, areaType, param] = matches;
    const length = Length.tryParseLength(param);
    switch (areaType) {
        case 'self':
            return { spellAreaType: 'self' };
        case 'point':
            return { spellAreaType: 'point' };
        case 'cone':
            return partialParsers.cone(length);
        case 'cube':
            return partialParsers.cube(length);
        case 'line':
            return partialParsers.line(length);
        case 'sphere.point':
            return partialParsers.sphere.point(length);
        case 'sphere.self':
            return partialParsers.sphere.self(length);
        default:
            return undefined;
    }
}

const defaultArea = { spellAreaType: 'point' } as const;

function parseArea(
    input: string,
    defaultValue: SpellArea = defaultArea,
): SpellArea {
    return tryParseArea(input) ?? defaultValue;
}

export {
    type SpellArea,
    type SpellAreaSelf,
    type SpellAreaPoint,
    type SpellAreaCone,
    type SpellAreaCube,
    type SpellAreaLine,
    type SpellAreaSphere,
    stringify,
    tryParseArea,
    parseArea,
};
