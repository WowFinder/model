// import { builder, ByKeyRecursive, forceDataLoadKeySRecursive } from '@wowfinder/ts-utils';
import { Rarity } from '@wowfinder/ts-enums';
import { Mass } from '../Scalar';
import Money from './Money';

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

    abstract get value(): Money;

    static preBuild(raw: any): ItemBuilder {
        return {
            label: (raw.label as string) || '',
            rarity: (raw.rarity as Rarity) || Rarity.common,
        };
    }

    // static #loaded: ByKeyRecursive<Item> | null = null;

    static load(): any {
        throw new Error('Not implemented');
    }

    /* static load(
        build: builder<Item>,
        reThrowErrors = false,
    ): ByKeyRecursive<Item> {
        return (this.#loaded ||= forceDataLoadKeySRecursive<Item>(
            window.Main.asset('Items'),
            build,
            reThrowErrors,
        ));
    } */
}

export type { ItemBuilder };
export { Item };
