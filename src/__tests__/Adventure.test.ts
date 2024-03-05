import { RawAdventureAsset } from '@wowfinder/assets';
import { Adventure } from 'Adventure';

describe('Adventure class', () => {
    const simpleAdventure: RawAdventureAsset = {
        key: 'simple',
        title: 'Simple Adventure',
        date: '2021-01-01',
        rewards: {
            player: {
                someCapitalCity: 100,
                xp: 1000,
            },
        },
    };
    const anotherAdventure: RawAdventureAsset = {
        key: 'another',
        title: 'Another Adventure',
        date: '2021-01-02',
        rewards: {
            player: {
                anotherCapitalCity: 200,
                xp: 2000,
            },
        },
    };
    const construct = (props: Partial<RawAdventureAsset>) =>
        new Adventure({ ...simpleAdventure, ...props });
    it('should construct properly', () => {
        const adventure = construct({});
        expect(adventure.key).toBe('simple');
        expect(adventure.title).toBe('Simple Adventure');
        expect(adventure.date).toBe('2021-01-01');
        expect(adventure.rewards).toEqual({
            player: {
                someCapitalCity: 100,
                xp: 1000,
            },
        });
    });
    it('should provide a string representation', () => {
        const adventure = construct({});
        expect(adventure.toString()).toBe('[2021-01-01] Simple Adventure');
    });
    it('should export properly', () => {
        const adventure = construct({});
        expect(adventure.export()).toEqual({
            key: 'simple',
            title: 'Simple Adventure',
            date: '2021-01-01',
            rewards: {
                player: {
                    someCapitalCity: 100,
                    xp: 1000,
                },
            },
        });
    });
    it('should combine rewards properly', () => {
        const adventure = construct({});
        const another = construct(anotherAdventure);
        expect(Adventure.combined([adventure, another])).toEqual({
            player: {
                someCapitalCity: 100,
                anotherCapitalCity: 200,
                xp: 3000,
            },
        });
    });
});
