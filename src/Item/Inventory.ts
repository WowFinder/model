import { MassUnit } from '@wowfinder/ts-enums';
import { JsonValue, sum } from '@wowfinder/ts-utils';
import { convertMass } from 'Scalar/Mass';
import { Gear, Item, buildItem } from '.';
import { Money } from './Money';

interface InventoryBuilder {
    money?: number;
    gear?: Gear[];
    carried?: Item[];
    owned?: Item[];
}

interface InventoryExport {
    [key: string]: JsonValue;
    money: number;
    gear: string[];
    carried: string[];
    owned: string[];
}

const needsPreffix = (val: any): boolean =>
    typeof val === 'string' && !val.startsWith('gear');
const addPreffix = (val: any): any => (needsPreffix(val) ? `gear.${val}` : val);
const isGear = (i: Item): boolean => i instanceof Gear;
const asGear = (i: Item): Gear => i as Gear;

class Inventory {
    #gear: Gear[];
    #carried: Item[];
    #owned: Item[];
    #money: Money;

    constructor({
        money = 0,
        gear = [],
        carried = [],
        owned = [],
    }: InventoryBuilder) {
        this.#gear = gear
            .map(addPreffix)
            .map(buildItem)
            .filter(isGear)
            .map(asGear);
        this.#carried = carried.map(buildItem);
        this.#owned = owned.map(buildItem);
        this.#money = Money.fromRaw(money);
    }

    static copy(inventory: Inventory): Inventory {
        return new Inventory({
            money: inventory.#money.raw,
            gear: inventory.gear,
        });
    }

    static get defaultBuilder(): InventoryBuilder {
        return {
            money: 0,
            gear: [],
        };
    }

    static get empty(): Inventory {
        return new Inventory(Inventory.defaultBuilder);
    }

    get money(): Money {
        return Money.fromMoney(this.#money);
    }

    get gear(): Gear[] {
        return this.#gear;
    }

    get carried(): Item[] {
        return this.#carried;
    }

    get owned(): Item[] {
        return this.#owned;
    }

    get load(): number {
        const items = [...this.#gear, ...this.#carried];
        return sum(
            ...items.map(g => convertMass(g.weight, MassUnit.pound).value),
        );
    }

    export(): InventoryExport {
        return {
            money: this.#money.raw,
            gear: this.#gear.map(g => g.label),
            carried: this.#carried.map(c => c.label),
            owned: this.#owned.map(o => o.label),
        };
    }
}

export { Inventory };
export type { InventoryBuilder, InventoryExport };
