import { LengthUnit, type Size, StandardRange } from '@wowfinder/ts-enums';
import { SpellRange, computeRange } from '../Range';

import { expectDefined } from './helpers';

describe('Range', () => {
    describe('computeRange', () => {
        it('should always return zero for `self` range', () => {
            for (let size = -4; size <= 4; size++) {
                for (let efl = 0; efl <= 20; efl++) {
                    const result = computeRange(
                        StandardRange.self,
                        size as Size,
                        efl,
                    );
                    expect(result.value).toBe(0);
                    expectDefined(result.unit);
                }
            }
        });

        it('should return correct values for `touch`, for normal and larger sizes', () => {
            const expectedValues = [5, 10, 15, 20, 25];
            for (let size = 0; size <= 4; size++) {
                for (let efl = 0; efl <= 20; efl++) {
                    const result = computeRange(
                        StandardRange.touch,
                        size as Size,
                        efl,
                    );
                    expect(result.value).toBe(expectedValues[size]);
                    expect(result.unit).toBe(LengthUnit.foot);
                }
            }
        });
        it('should return minimal touch range for `touch` for smaller sizes', () => {
            for (let size = -4; size < 0; size++) {
                for (let efl = 0; efl <= 20; efl++) {
                    const result = computeRange(
                        StandardRange.touch,
                        size as Size,
                        efl,
                    );
                    expect(result.value).toBe(0);
                }
            }
        });

        it('should return correct values for `close` range', () => {
            const expectedValues = [
                25, 25, 30, 30, 35, 35, 40, 40, 45, 45, 50, 50, 55, 55, 60, 60,
                65, 65, 70, 70, 75,
            ];
            for (let size = -4; size <= 4; size++) {
                for (let efl = 0; efl <= 20; efl++) {
                    const result = computeRange(
                        StandardRange.close,
                        size as Size,
                        efl,
                    );
                    expect(result.value).toBe(expectedValues[efl]);
                    expect(result.unit).toBe(LengthUnit.foot);
                }
            }
        });

        it('should return correct values for `medium` range', () => {
            const expectedValues = [
                100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220,
                230, 240, 250, 260, 270, 280, 290, 300,
            ];
            for (let size = -4; size <= 4; size++) {
                for (let efl = 0; efl <= 20; efl++) {
                    const result = computeRange(
                        StandardRange.medium,
                        size as Size,
                        efl,
                    );
                    expect(result.value).toBe(expectedValues[efl]);
                    expect(result.unit).toBe(LengthUnit.foot);
                }
            }
        });

        it('should return correct values for `long` range', () => {
            const expectedValues = [
                400, 440, 480, 520, 560, 600, 640, 680, 720, 760, 800, 840, 880,
                920, 960, 1000, 1040, 1080, 1120, 1160, 1200,
            ];
            for (let size = -4; size <= 4; size++) {
                for (let efl = 0; efl <= 20; efl++) {
                    const result = computeRange(
                        StandardRange.long,
                        size as Size,
                        efl,
                    );
                    expect(result.value).toBe(expectedValues[efl]);
                    expect(result.unit).toBe(LengthUnit.foot);
                }
            }
        });
    });

    describe('SpellRange.tryParse', () => {
        it('should parse "special"', () => {
            const result = SpellRange.tryParse('special');
            expectDefined(result);
            expect(result).toBe('special');
        });
        it('should parse standard ranges', () => {
            for (const rangeKey of Object.keys(StandardRange)) {
                const result = SpellRange.tryParse(rangeKey);
                expectDefined(result);
                expect(result).toBe(
                    StandardRange[rangeKey as keyof typeof StandardRange],
                );
            }
        });
        it('should parse lengths', () => {
            const inputs = ['30 foot', '10 meter', '1 mile'];
            for (const input of inputs) {
                const result = SpellRange.tryParse(input);
                expectDefined(result);
                expect(typeof result).toBe('object');
                if (typeof result === 'object') {
                    expect(result.toString()).toBe(input);
                }
            }
        });
        it('should return undefined for invalid input', () => {
            const inputs = ['invalid', 'foo', 'bar'];
            for (const input of inputs) {
                const result = SpellRange.tryParse(input);
                expect(result).toBeUndefined();
            }
        });
    });
    describe('SpellRange.forceParse', () => {
        it('should parse "special"', () => {
            const result = SpellRange.forceParse('special', StandardRange.self);
            expect(result).toBe('special');
        });
        it('should parse standard ranges', () => {
            for (const rangeKey of Object.keys(StandardRange)) {
                const result = SpellRange.forceParse(
                    rangeKey,
                    StandardRange.self,
                );
                expect(result).toBe(
                    StandardRange[rangeKey as keyof typeof StandardRange],
                );
            }
        });
        it('should parse lengths', () => {
            const inputs = ['30 foot', '10 meter', '1 mile'];
            for (const input of inputs) {
                const result = SpellRange.forceParse(input, StandardRange.self);
                expect(typeof result).toBe('object');
                if (typeof result === 'object') {
                    expect(result.toString()).toBe(input);
                }
            }
        });
        it('should return the default value for invalid input', () => {
            const inputs = ['invalid', 'foo', 'bar'];
            for (const input of inputs) {
                const result = SpellRange.forceParse(
                    input,
                    StandardRange.touch,
                );
                expect(result).toBe(StandardRange.touch);
            }
        });
        it('should return the default value if none is provided', () => {
            const inputs = ['invalid', 'foo', 'bar'];
            for (const input of inputs) {
                const result = SpellRange.forceParse(input);
                expect(result).toBe('special');
            }
        });
    });
});
