import { Rarity } from '@wowfinder/ts-enums';
import type { Mass } from '../Scalar';
import type { Money } from './Money';

type ItemBuilder = {
    rarity?: Rarity;
    label: string;
};

abstract class Item {
    readonly #label: string;
    readonly #rarity: Rarity;
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
            label: `${(raw.label as string) || ''}`,
            rarity: Object.values(Rarity).includes(raw.rarity)
                ? (raw.rarity as Rarity)
                : Rarity.common,
        };
    }
}

export { Item };
export type { ItemBuilder };
