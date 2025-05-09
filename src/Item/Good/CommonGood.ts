import { Mass } from '../../Scalar';
import { Money } from '../Money';
import { Item, ItemBuilder } from '../base';

type CommonGoodBuilder = ItemBuilder & {
    weight: Mass | number;
    value: number;
};

class CommonGood extends Item {
    readonly #weight: Mass;
    readonly #value: number;
    constructor({ weight, value, ...args }: CommonGoodBuilder) {
        super(args);
        this.#weight = Mass.asPounds(weight);
        this.#value = value;
    }

    get weight(): Mass {
        return this.#weight;
    }

    get value(): Money {
        return Money.fromRaw(this.#value);
    }

    static build(raw: any): CommonGood {
        return new CommonGood({
            ...Item.preBuild(raw),
            weight: raw.weight || 0,
            value: raw.value || 0,
            label: `good.common.${raw.key || ''}`,
        });
    }
}

export { CommonGood };
