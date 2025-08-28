import { RankedSpell, type RankedSpellBuilder } from '../RankedSpell';
import { yellowSnowBall } from '../../../__mocks__';
import { expectDefined, t } from './helpers';
import { type SpellAreaSphere } from '../Area';
import { toRoman } from '@wowfinder/ts-utils';

const yellowSnowBallRank2Builder = {
    key: 'yellowSnowBall',
    ...yellowSnowBall.ranks[1],
    area: yellowSnowBall.ranks[1].area ?? 'point',
    range: yellowSnowBall.range ?? 'touch',
    duration: yellowSnowBall.duration ?? 'instantaneous',
    castingTime: yellowSnowBall.castingTime ?? 'standard',
    school: yellowSnowBall.school,
    components: yellowSnowBall.components,
    save: yellowSnowBall.save,
    flags: yellowSnowBall.flags ?? [],
    descriptors: [],
} satisfies RankedSpellBuilder;

describe('RankedSpell', () => {
    describe('constructor', () => {
        it('should create an instance from a complete builder', () => {
            const spell = new RankedSpell(yellowSnowBallRank2Builder);
            expect(spell).toBeInstanceOf(RankedSpell);
            expect(spell.key).toBe('yellowSnowBall');
            expect(spell.rank).toBe(2);
            expect(spell.school).toBe('evocation');
            expect(spell.castingTime).toBe('standard');
            expect(spell.range).toBe('long');
            expect(spell.duration).toBe('instantaneous');
            const area = spell.area as SpellAreaSphere;
            expectDefined(area);
            expect(area.spellAreaType).toBe('sphere');
            expectDefined(area.radius);
            expect(area.radius.inches).toBe(40 * 12);
            expect(area.selfCentered).toBe(false);
        });
        it('should throw an error if an invalid school is provided', () => {
            expect(() => {
                new RankedSpell({
                    ...yellowSnowBallRank2Builder,
                    school: 'invalidSchool',
                });
            }).toThrow('Invalid school: invalidSchool');
        });
        it('should throw an error if school is missing', () => {
            expect(() => {
                new RankedSpell({
                    ...yellowSnowBallRank2Builder,
                    // @ts-expect-error Testing missing school
                    school: undefined,
                });
            }).toThrow(/Invalid school/i);
        });
    });
    describe('getFullName', () => {
        it('should return the full name of the spell', () => {
            const spell = new RankedSpell(yellowSnowBallRank2Builder);
            const fullName = spell.getFullName(t);
            expect(fullName).toContain(spell.key);
            expect(fullName).toContain(toRoman(spell.rank));
        });
    });
    describe('getDescription', () => {
        it('should return the description of the spell', () => {
            const spell = new RankedSpell(yellowSnowBallRank2Builder);
            const description = spell.getDescription(t);
            expect(description).toContain(`spells.${spell.key}.description`);
            expect(description).toContain(`spells.${spell.key}.${spell.rank}`);
        });
    });
});
