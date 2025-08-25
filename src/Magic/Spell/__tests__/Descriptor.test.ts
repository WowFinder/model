import {
    stringify,
    tryParseSpellDescriptor,
    parseValidSpellDescriptors,
} from '../Descriptor';
import { t } from './helpers';
import { SpellDescriptor } from '@wowfinder/ts-enums';

const SpellDescriptorKeys = Object.keys(SpellDescriptor) as SpellDescriptor[];

describe('Descriptor', () => {
    describe('stringify', () => {
        it.each(SpellDescriptorKeys)(
            'should stringify a value of SpellDescriptor.%s',
            key => {
                const result = stringify(key, t);
                expect(result).toBeDefined();
                expect(result).toContain(key);
            },
        );
    });
    describe('tryParseSpellDescriptor', () => {
        it.each(SpellDescriptorKeys)(
            'should parse a valid SpellDescriptor key %s',
            key => {
                const result = tryParseSpellDescriptor(key);
                expect(result).toBe(key);
            },
        );
        it('should return undefined for an invalid SpellDescriptor key', () => {
            const result = tryParseSpellDescriptor('invalid-key');
            expect(result).toBeUndefined();
        });
    });
    describe('parseValidSpellDescriptors', () => {
        it('should parse an array of mixed valid and invalid SpellDescriptor keys', () => {
            const inputs = ['fire', 'invalid-key', 'holy', 123, 'arcane'];
            const result = parseValidSpellDescriptors(inputs);
            expect(result).toEqual(['fire', 'holy', 'arcane']);
        });
        it('should return an empty array when no valid SpellDescriptor keys are present', () => {
            const inputs = ['invalid-key1', 'invalid-key2', 456];
            const result = parseValidSpellDescriptors(inputs);
            expect(result).toEqual([]);
        });
    });
});

