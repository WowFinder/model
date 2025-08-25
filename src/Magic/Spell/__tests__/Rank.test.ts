import { SpellRank } from '../Rank';
import { yellowSnowBall } from '../../../__mocks__';

describe('SpellRank', () => {
    describe('should build valid instances from raw objects', () => {
        for (let rank of yellowSnowBall.ranks) {
            it(`from mock: yellowSnowBall[${rank.rank}]`, () => {
                const result = new SpellRank(rank);
                expect(result).toBeInstanceOf(SpellRank);
                expect(result.rank).toBe(rank.rank);
            });
        }
    });
    it('should default rank to 0 if not provided', () => {
        const result = new SpellRank({
            ...yellowSnowBall.ranks[0],
            rank: undefined as any,
        });
        expect(result.rank).toBe(0);
    });
});

