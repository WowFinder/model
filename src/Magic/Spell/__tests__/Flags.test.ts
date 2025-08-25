import { tryParseFlag, parseValidFlags } from '../Flags';
import { SpellFlag } from '@wowfinder/ts-enums';

const spellFlagKeys = Object.keys(SpellFlag) as SpellFlag[];

describe('Flags', () => {
    describe('tryParseFlag', () => {
        it.each(spellFlagKeys)('should parse a valid SpellFlag key %s', key => {
            const result = tryParseFlag(key);
            expect(result).toBe(key);
        });
        it('should return undefined for an invalid SpellFlag key', () => {
            const result = tryParseFlag('invalid-key');
            expect(result).toBeUndefined();
        });
    });
    describe('parseValidFlags', () => {
        it('should parse an array of mixed valid and invalid SpellFlag keys', () => {
            const inputs = [
                'dismissable',
                'invalid-key',
                'spellResistance',
                123,
                'concentration',
            ];
            const result = parseValidFlags(inputs as any);
            expect(result).toEqual([
                'dismissable',
                'spellResistance',
                'concentration',
            ]);
        });
        it('should return an empty array when no valid SpellFlag keys are present', () => {
            const inputs = ['invalid-key1', 'invalid-key2', 456];
            const result = parseValidFlags(inputs as any);
            expect(result).toEqual([]);
        });
    });
});
