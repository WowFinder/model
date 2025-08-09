import { Inventory, type InventoryBuilder } from '../Inventory';
import { ItemImpl, mockMoneyRaw, mockWeightPounds } from './helpers';

const mockItems = [
    new ItemImpl({ label: 'test.item0' }),
    new ItemImpl({ label: 'test.item1' }),
    new ItemImpl({ label: 'test.item2' }),
    new ItemImpl({ label: 'test.item3' }),
    new ItemImpl({ label: 'test.item4' }),
];

const mockCarried = mockItems.slice(0, 2);
const mockOwned = mockItems.slice(2);

function mkInventory({
    money = mockMoneyRaw,
    gear = [], // TODO: Waiting for Gear subtypes and proper mocks
    carried = mockCarried,
    owned = mockOwned,
}: Partial<InventoryBuilder> = {}): Inventory {
    return new Inventory({
        money,
        gear,
        carried,
        owned,
    });
}

describe('Inventory class', () => {
    describe('basic construction and getters', () => {
        const inventory = mkInventory();
        it('should create an instance of Inventory', () => {
            expect(inventory).toBeInstanceOf(Inventory);
        });
        it('should have a correct money value', () => {
            expect(inventory.money.raw).toEqual(mockMoneyRaw);
        });
        it('should have correct items carried', () => {
            expect(inventory.carried).toEqual(mockCarried);
        });
        it('should have correct items owned', () => {
            expect(inventory.owned).toEqual(mockOwned);
        });
        it('should compute the total load correctly', () => {
            // TODO Include gear (currently empty)
            const load = inventory.load;
            const expectedCarriedLoad = mockCarried.length * mockWeightPounds;
            expect(load).toBe(expectedCarriedLoad);
        });
        it('should export the inventory correctly', () => {
            const exportData = inventory.export();
            expect(exportData.money).toBe(mockMoneyRaw);
            expect(exportData.gear).toEqual([]);
            expect(exportData.carried).toEqual(mockCarried.map(i => i.label));
            expect(exportData.owned).toEqual(mockOwned.map(i => i.label));
        });
    });
    describe('copy method', () => {
        it('should create a copy of the inventory', () => {
            const src = mkInventory();
            const copy = Inventory.copy(src);
            expect(copy).toEqual(src);
            expect(copy).not.toBe(src); // Ensure it's a new instance
        });
    });
    describe('default builder', () => {
        it('should return a default builder with zero money and no items', () => {
            const defaultBuilder = Inventory.defaultBuilder;
            expect(defaultBuilder.money ?? 0).toBe(0);
            expect(defaultBuilder.gear ?? []).toEqual([]);
            expect(defaultBuilder.carried ?? []).toEqual([]);
            expect(defaultBuilder.owned ?? []).toEqual([]);
        });
    });
    describe('empty method', () => {
        it('should return an empty inventory', () => {
            const emptyInventory = Inventory.empty;
            expect(emptyInventory.money.raw).toBe(0);
            expect(emptyInventory.gear).toEqual([]);
            expect(emptyInventory.carried).toEqual([]);
            expect(emptyInventory.owned).toEqual([]);
        });
    });
});
