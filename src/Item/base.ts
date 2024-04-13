import { Rarity } from '@wowfinder/ts-enums';
import type { Mass } from '../Scalar';
import type { Money } from './Money';

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

    /* static load(): any {
        throw new Error('Not implemented');
    } */
}

export { Item };
export type { ItemBuilder };
