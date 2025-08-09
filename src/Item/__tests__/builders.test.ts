import { Rarity } from '@wowfinder/ts-enums';
import { buildItem } from '../builders';
import { Potion } from '../Consumable/Craftable/Potion';
import { ItemImpl } from './helpers';

const preBuiltMockItem = new ItemImpl({
    label: 'test.generic-prebuilt-item',
});

const preBuiltPotion = {
    $type: 'Potion',
    $expectedLabel: 'consumable.potion.testPotion',
    key: 'testPotion',
    rarity: Rarity.uncommon,
    health: {
        // 2d6 + 4
        sides: 6,
        qtty: 2,
        fixedMod: 4,
    },
} as const;

describe('buildItem', () => {
    it('should return the given value when passed an item instance', () => {
        const result = buildItem(preBuiltMockItem);
        expect(result).toBe(preBuiltMockItem);
    });
    it('[WiP] should throw when passed a string (item key)', () => {
        // Once implemented, this should retrieve a preloaded item based on its key
        expect(() => buildItem('test.generic-prebuilt-item')).toThrow(
            'Not implemented',
        );
    });
    it('should delegate to a specific builder for a known item type', () => {
        const potion = buildItem(preBuiltPotion) as Potion;
        expect(potion).toBeInstanceOf(Potion);
        expect(potion.label).toBe(preBuiltPotion.$expectedLabel);
        expect(potion.rarity).toBe(Rarity.uncommon);
        expect(potion.health.sides).toBe(6);
        expect(potion.health.qtty).toBe(2);
        expect(potion.health.fixedMod).toBe(4);
    });
    it('should throw when no valid type is available', () => {
        const badRaw = {
            ...preBuiltPotion,
            $type: undefined,
        };
        expect(() => buildItem(badRaw)).toThrow('Invalid item data:');
    });
});
