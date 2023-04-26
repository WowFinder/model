import {
    builder,
    ByKeyRecursive,
    forceDataImportKeySRecursive,
} from '../../utils';
import { Mass } from '../Units';
import { Rarity } from './Rarity';

interface ItemBuilder {
    rarity?: Rarity;
    label: string;
}

abstract class Item {
    #label: string;
    #rarity: Rarity;
    constructor({ label, rarity = Rarity.common }: ItemBuilder) {
        this.#label = label;
        this.#rarity = rarity;
    }

    get label(): string {
        return this.#label;
    }

    get key(): string {
        return this.#label.split('.').reverse()[0];
    }

    get rarity(): Rarity {
        return this.#rarity;
    }

    abstract get weight(): Mass;

    static preBuild(raw: any): ItemBuilder {
        return {
            label: (raw.label as string) || '',
            rarity: (raw.rarity as Rarity) || Rarity.common,
        };
    }

    static #imported: ByKeyRecursive<Item> | null = null;

    static import(
        dir = window.Main.asset('Items'),
        build: builder<Item>,
    ): ByKeyRecursive<Item> {
        return (this.#imported ||= forceDataImportKeySRecursive<Item>(
            dir,
            build,
        ));
    }
}

export type { ItemBuilder };
export { Item };
