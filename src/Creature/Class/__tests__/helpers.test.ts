import { Aura, Skill } from '@wowfinder/ts-enums';
import {
    hdAverage,
    hdFirst,
    mapFeatures,
    mapAuras,
    filterSkills,
} from '../helpers';
import { ClassFeature } from '../Features';
const hitDice = [
    { sides: 12, average: 7, first: 5 },
    { sides: 10, average: 6, first: 4 },
    { sides: 8, average: 5, first: 3 },
    { sides: 6, average: 4, first: 2 },
];

describe('Class helpers', () => {
    describe('hdAverage', () => {
        for (const { sides, average } of hitDice) {
            it(`should return ${average} for d${sides}`, () => {
                expect(hdAverage(sides)).toBe(average);
            });
        }
    });
    describe('hdFirst', () => {
        for (const { sides, first } of hitDice) {
            it(`should return ${first} for d${sides}`, () => {
                expect(hdFirst(sides)).toBe(first);
            });
        }
    });
});

describe('mapFeatures', () => {
    it('should map and filter features', () => {
        const result = mapFeatures([
            { level: 1, feature: ClassFeature.abundantStep },
            { level: 2, feature: ClassFeature.venomInmunity },
            { level: 3, feature: 'test-invalid-feature' },
        ]);
        expect(result).toEqual([
            { level: 1, feature: ClassFeature.abundantStep },
            { level: 2, feature: ClassFeature.venomInmunity },
        ]);
    });
});

describe('mapAuras', () => {
    it('should map and filter auras', () => {
        const result = mapAuras([
            { level: 1, aura: Aura.commanding },
            { level: 2, aura: Aura.furious },
            { level: 3, aura: 'test-invalid-aura' },
        ]);
        expect(result).toEqual([
            { level: 1, aura: Aura.commanding },
            { level: 2, aura: Aura.furious },
        ]);
    });
});

describe('filterSkills', () => {
    it('should filter out invalid skills', () => {
        const result = filterSkills([Skill.acrobatics, 'test', Skill.stealth]);
        expect(result).toEqual(new Set([Skill.acrobatics, Skill.stealth]));
    });
});
