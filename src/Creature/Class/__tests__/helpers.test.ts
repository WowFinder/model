import { Aura, Skill } from '@wowfinder/ts-enums';
import {
    hdAverage,
    hdFirst,
    mapFeatures,
    mapAuras,
    filterSkills,
    combinedClassEntries,
} from '../helpers';
import { ClassFeature } from '../Features';
import { mockArcaneClass, mockMeleeClass } from '../../../__mocks__';
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

describe('combinedClassEntries', () => {
    it('should combine duplicate class entries and sort by level', () => {
        const entries = [
            { class: mockArcaneClass, level: 1 },
            { class: mockMeleeClass, level: 2 },
            { class: mockArcaneClass, level: 3 },
        ];
        const result = combinedClassEntries(entries);
        expect(result).toEqual([
            { class: mockArcaneClass, level: 4 },
            { class: mockMeleeClass, level: 2 },
        ]);
    });
    it('should sort alphabetically by key when levels are equal', () => {
        const entries = [
            { class: mockMeleeClass, level: 1 },
            { class: mockArcaneClass, level: 1 },
        ];
        const result = combinedClassEntries(entries);
        expect(result).toEqual([
            { class: mockArcaneClass, level: 1 },
            { class: mockMeleeClass, level: 1 },
        ]);
    });
});
