import {
    Requirement,
    FunctionBasedRequirement,
    EmptyRequirement,
    or,
    and,
    MinStatsRequirement,
    MaxStatsRequirement,
    characterStatsRequirement,
} from '../index';

describe('index', () => {
    it('should export Requirement', () => {
        expect(Requirement).toBeDefined();
    });
    it('should export FunctionBasedRequirement', () => {
        expect(FunctionBasedRequirement).toBeDefined();
    });
    it('should export EmptyRequirement', () => {
        expect(EmptyRequirement).toBeDefined();
    });
    it('should export or', () => {
        expect(or).toBeDefined();
    });
    it('should export and', () => {
        expect(and).toBeDefined();
    });
    it('should export MinStatsRequirement', () => {
        expect(MinStatsRequirement).toBeDefined();
    });
    it('should export MaxStatsRequirement', () => {
        expect(MaxStatsRequirement).toBeDefined();
    });
    it('should export characterStatsRequirement', () => {
        expect(characterStatsRequirement).toBeDefined();
    });
});


