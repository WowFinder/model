import { Spell } from '../Spell';
import { yellowSnowBall } from '../../../__mocks__';
import { expectDefined, t } from './helpers';

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
            });
            for (let rank of yellowSnowBall.ranks) {
                it(`should have the correct values for rank ${rank.rank}`, () => {
                    const spellRank = spell.ranks.find(
                        r => r.rank === rank.rank,
                    );
                    expectDefined(spellRank);
                    expect(spellRank.rank).toBe(rank.rank);
                    const area = spellRank.area;
                    expectDefined(area);
                    expect(spellRank.castingTime).toBe(
                        rank.castingTime ?? yellowSnowBall.castingTime ?? null,
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
        });
    });
});

