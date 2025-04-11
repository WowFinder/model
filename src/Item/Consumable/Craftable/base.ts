import { ActionLength } from '@wowfinder/ts-enums';
import type { ActionTime } from '../../../Action/ActionTime';
import { Consumable } from '../base';
import { Money } from '../../Money';
import type { ItemBuilder } from '../../base';

type CraftableConsumableBuilder = ItemBuilder & {
    dc?: number;
};

abstract class CraftableConsumable extends Consumable {
    readonly #dc: number;
    constructor({ dc = 1, ...rest }: CraftableConsumableBuilder) {
        super(rest);
        this.#dc = dc;
    }

    protected abstract get skillValueMultiplier(): number;

    get useTime(): ActionTime {
        return ActionLength.standard;
    }

    get value(): Money {
        return Money.fromRaw(this.#dc * this.#dc * this.skillValueMultiplier);
    }

    get dc(): number {
        return this.#dc;
    }
}

export { CraftableConsumable, type CraftableConsumableBuilder };
