import { Spell } from '../Spell';
import { yellowSnowBall } from '../../../__mocks__';
import { expectDefined, t } from './helpers';
import { type RawSpellAsset } from '@wowfinder/asset-schemas';
import { assertNonNil } from '@wowfinder/ts-utils';

describe('Spell', () => {
    describe('constructor and getters', () => {
        describe('should build an instance with correct values', () => {
            const spell = new Spell(yellowSnowBall);
            it('should have the correct key', () => {
                expect(spell.key).toBe(yellowSnowBall.key);
                const fullName = spell.getFullName(t);
                expect(fullName).toBeDefined();
                expect(fullName).toBe(`spells.${spell.key}.name`);
                const description = spell.getDescription(t);
                expect(description).toBeDefined();
                expect(description).toBe(`spells.${spell.key}.description`);
            });
            it('should have the correct global properties', () => {
                expect(spell.school).toBe(yellowSnowBall.school);
                // TODO: Descriptors (pending implementations)
                expect(spell.components.toSorted()).toEqual(
                    yellowSnowBall.components.toSorted(),
                );
                expect(spell.flags.toSorted()).toEqual(
                    (yellowSnowBall.flags ?? []).toSorted(),
                );
                expect(spell.subschool).toBeUndefined();
                expect(spell.schoolDescription).toEqual(yellowSnowBall.school);
            });
            describe('ranks', () => {
                it('should have the correct number of ranks', () => {
                    expect(spell.ranks.length).toBe(
                        yellowSnowBall.ranks.length,
                    );
                });
                for (const rank of yellowSnowBall.ranks) {
                    it(`should have the correct values for rank ${rank.rank}`, () => {
                        const spellRank = spell.ranks.find(
                            r => r.rank === rank.rank,
                        );
                        expectDefined(spellRank);
                        expect(spellRank.rank).toBe(rank.rank);
                        const area = spellRank.area;
                        expectDefined(area);
                        expect(spellRank.castingTime).toBe(
                            rank.castingTime ??
                                yellowSnowBall.castingTime ??
                                null,
                        );
                        expect(spellRank.range).toBe(
                            rank.range ?? yellowSnowBall.range ?? null,
                        );
                        expect(spellRank.duration).toBe(
                            rank.duration ?? yellowSnowBall.duration ?? null,
                        );
                        // TODO: save (pending implementations)
                    });
                }
                it('should return the full list of ranks', () => {
                    const ranks = spell.fullRanks;
                    expect(ranks.length).toBe(yellowSnowBall.ranks.length);
                });
                it('should throw when trying to get an invalid rank', () => {
                    expect(() => spell.getRank(-1)).toThrow(/Invalid rank/);
                    expect(() =>
                        spell.getRank(yellowSnowBall.ranks.length + 1),
                    ).toThrow(/Invalid rank/);
                });
            });
        });
        it('should build an instance with minimal values', () => {
            // @ts-expect-error explicitly testing fallback behaviour
            const notSoYellow = {
                ...yellowSnowBall,
                descriptors: undefined,
                components: undefined,
                flags: undefined,
            } as RawSpellAsset;
            const spell = new Spell(notSoYellow);
            expect(spell).toBeInstanceOf(Spell);
            assertNonNil(spell.descriptors);
            assertNonNil(spell.components);
            assertNonNil(spell.flags);
        });
        it('should throw if school is invalid / unparseable', () => {
            // @ts-expect-error explicitly testing fallback behaviour
            const badSchool = {
                ...yellowSnowBall,
                school: undefined,
            } as RawSpellAsset;
            expect(() => new Spell(badSchool)).toThrow(/Invalid school/);
        });
        it('should throw if a rank is missing mandatory properties', () => {
            const incomplete = {
                ...yellowSnowBall,
                ranks: [
                    {
                        ...yellowSnowBall.ranks[0],
                        castingTime: undefined,
                    },
                ],
            } as RawSpellAsset;
            expect(() => new Spell(incomplete)).toThrow(
                /Invalid spell definition/,
            );
        });
    });
});
