import { MassUnit, Rarity } from '@wowfinder/ts-enums';
import { Mass } from '../../Scalar/Mass';
import { Item } from '../base';
import { Money } from '../Money';
import {
    ItemImpl,
    mockItemBuilder,
    mockRareItemBuilder,
    mockItemKey,
    mockWeightPounds,
    mockMoneyRaw,
} from './helpers';

describe('Item base class', () => {
    it('should create an item with minimal values', () => {
        const item = new ItemImpl(mockItemBuilder);
        expect(item.label).toBe(mockItemBuilder.label);
        expect(item.rarity).toBe(Rarity.common);
    });
    it('should create an item with rarity', () => {
        const item = new ItemImpl(mockRareItemBuilder);
        expect(item.label).toBe(mockRareItemBuilder.label);
        expect(item.rarity).toBe(mockRareItemBuilder.rarity);
    });
    it('should expose correct values through getters', () => {
        const item = new ItemImpl(mockItemBuilder);
        expect(item.key).toBe(mockItemKey);
        const weight = item.weight;
        expect(weight).toBeInstanceOf(Mass);
        expect(weight.value).toBe(mockWeightPounds);
        expect(weight.unit).toBe(MassUnit.pound);
        const value = item.value;
        expect(value).toBeInstanceOf(Money);
        expect(value.raw).toBe(mockMoneyRaw);
    });
    describe('preBuild helper method', () => {
        it('should create a builder object with no args', () => {
            const builder = Item.preBuild({});
            expect(builder.label).toBe('');
            expect(builder.rarity).toBe(Rarity.common);
        });
        it('should create a builder object with valid args', () => {
            const builder = Item.preBuild({
                label: 'test.label',
                rarity: Rarity.epic,
            });
            expect(builder.label).toBe('test.label');
            expect(builder.rarity).toBe(Rarity.epic);
        });
        it('should create a viable builder object even from invalid args', () => {
            const builder = Item.preBuild({
                label: 12345, // invalid type
                rarity: 'invalid', // invalid value
            });
            expect(builder.label).toBe('12345');
            expect(builder.rarity).toBe(Rarity.common);
        });
    });
});
