import { Reputation } from '@wowfinder/ts-enums';
import { Faction, reputationByScore, nextScore } from '../Faction';

const reputationScoreExamples = [
    { score: -45000, expectedTier: Reputation.hated, next: -42000 },
    { score: -42000, expectedTier: Reputation.hated, next: -6000 },
    { score: -6000, expectedTier: Reputation.hostile, next: -3000 },
    { score: -3000, expectedTier: Reputation.unfriendly, next: 0 },
    { score: 0, expectedTier: Reputation.neutral, next: 3000 },
    { score: 1500, expectedTier: Reputation.neutral, next: 3000 },
    { score: 3000, expectedTier: Reputation.friendly, next: 9000 },
    { score: 6000, expectedTier: Reputation.friendly, next: 9000 },
    { score: 9000, expectedTier: Reputation.honored, next: 21000 },
    { score: 15000, expectedTier: Reputation.honored, next: 21000 },
    { score: 21000, expectedTier: Reputation.revered, next: 42000 },
    { score: 31500, expectedTier: Reputation.revered, next: 42000 },
    { score: 42000, expectedTier: Reputation.exalted, next: NaN },
    { score: 45000, expectedTier: Reputation.exalted, next: NaN },
];

describe('reputationByScore', () => {
    it.each(reputationScoreExamples)(
        'should return the expected tier for a given score',
        ({ score, expectedTier }) => {
            expect(reputationByScore(score)).toBe(expectedTier);
        },
    );
});

describe('nextScore', () => {
    it.each(reputationScoreExamples)(
        'should return the score for the next tier for a given score',
        ({ score, next }) => {
            expect(nextScore(score)).toBe(next);
        },
    );
});

describe('Faction', () => {
    const builder = {
        key: 1,
        label: 'test',
        name: 'Test Faction',
    };
    it('should correctly create a new instance', () => {
        const faction = new Faction(builder);
        expect(faction).toBeInstanceOf(Faction);
        expect(faction.key).toBe(1);
        expect(faction.label).toBe('test');
        expect(faction.name).toBe('Test Faction');
    });
    it('should stringify correctly', () => {
        const faction = new Faction(builder);
        expect(faction.toString()).toBe(builder.name);
    });
});
