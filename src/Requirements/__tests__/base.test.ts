import { and, EmptyRequirement, or } from '../base';
import { smallNumberRequirement, oddNumberRequirement } from './helpers';

describe('Requirements base classes', () => {
    describe('EmptyRequirement', () => {
        it('should always return true', () => {
            const requirement = new EmptyRequirement();
            expect(requirement.test()).toBe(true);
        });
    });

    describe('or method', () => {
        const smallOrOdd = or(smallNumberRequirement, oddNumberRequirement);
        it('should return true for small numbers', () => {
            expect(smallOrOdd.test(42)).toBe(true);
            expect(smallOrOdd.test(99)).toBe(true);
        });
        it('should return true for odd numbers', () => {
            expect(smallOrOdd.test(3)).toBe(true);
            expect(smallOrOdd.test(101)).toBe(true);
        });
        it('should return false for even large numbers', () => {
            expect(smallOrOdd.test(200)).toBe(false);
            expect(smallOrOdd.test(102)).toBe(false);
        });
    });

    describe('and method', () => {
        const smallAndOdd = and(smallNumberRequirement, oddNumberRequirement);
        it('should return true for small odd numbers', () => {
            expect(smallAndOdd.test(3)).toBe(true);
            expect(smallAndOdd.test(99)).toBe(true);
        });
        it('should return false for small even numbers', () => {
            expect(smallAndOdd.test(2)).toBe(false);
            expect(smallAndOdd.test(100)).toBe(false);
        });
        it('should return false for large odd numbers', () => {
            expect(smallAndOdd.test(101)).toBe(false);
            expect(smallAndOdd.test(201)).toBe(false);
        });
    });
});
