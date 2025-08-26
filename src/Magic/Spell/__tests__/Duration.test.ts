import { TimeUnit } from '@wowfinder/ts-enums';
import { Time } from '../../../Scalar';
import {
    type SpellDuration,
    stringify,
    tryParseSpellDuration,
} from '../Duration';
import { expectDefined, t } from './helpers';

function mkTimeMinutes(value: number): Time {
    return new Time({ value, unit: TimeUnit.minute });
}

function mkTimeTurns(value: number): Time {
    return new Time({ value, unit: TimeUnit.turn });
}

describe('Duration', () => {
    describe('stringify', () => {
        it('should stringify "special"', () => {
            const result = stringify('special', t);
            expect(result).toBe('magic.duration.special');
        });
        it('should stringify "instantaneous"', () => {
            const result = stringify('instantaneous', t);
            expect(result).toBe('magic.duration.instantaneous');
        });
        it('should stringify "permanent"', () => {
            const result = stringify('permanent', t);
            expect(result).toBe('magic.duration.permanent');
        });
        it('should stringify "concentration"', () => {
            const result = stringify('concentration', t);
            expect(result).toBe('magic.duration.concentration');
        });
        it('should stringify a fixed duration', () => {
            const duration: SpellDuration = {
                durationType: 'fixed',
                duration: mkTimeMinutes(10),
            };
            const result = stringify(duration, t);
            expect(result).toBe(
                'magic.duration.fixed {"duration":"10 units.minute"}',
            );
        });
        it('should stringify a per-level duration', () => {
            const duration: SpellDuration = {
                durationType: 'perLevel',
                duration: mkTimeTurns(1),
            };
            const result = stringify(duration, t);
            expect(result).toBe(
                'magic.duration.perLevel {"duration":"1 units.turn"}',
            );
        });
        it('should throw an error if an invalid value is provided', () => {
            expect(() =>
                // @ts-expect-error Testing invalid value
                stringify({ invalid: 'value' }, t),
            ).toThrow();
        });
    });

    describe('tryParseSpellDuration', () => {
        it('should parse "special"', () => {
            const result = tryParseSpellDuration('special');
            expectDefined(result);
            expect(result).toBe('special');
        });
        it('should parse "instantaneous"', () => {
            const result = tryParseSpellDuration('instantaneous');
            expectDefined(result);
            expect(result).toBe('instantaneous');
        });
        it('should parse "permanent"', () => {
            const result = tryParseSpellDuration('permanent');
            expectDefined(result);
            expect(result).toBe('permanent');
        });
        it('should parse "concentration"', () => {
            const result = tryParseSpellDuration('concentration');
            expectDefined(result);
            expect(result).toBe('concentration');
        });
        it('should parse a fixed duration', () => {
            const result = tryParseSpellDuration('10 minutes');
            expectDefined(result);
            expect(result).toEqual({
                durationType: 'fixed',
                duration: mkTimeMinutes(10),
            });
        });
        it('should parse a per-level duration', () => {
            const result = tryParseSpellDuration('1 turn/level');
            expectDefined(result);
            expect(result).toEqual({
                durationType: 'perLevel',
                duration: mkTimeTurns(1),
            });
        });
        it('should return undefined when parsing an invalid per-level duration', () => {
            const result = tryParseSpellDuration('invalid/level');
            expect(result).toBeUndefined();
        });
        it('should return undefined when parsing an invalid value', () => {
            const result = tryParseSpellDuration('invalid');
            expect(result).toBeUndefined();
        });
    });
});
