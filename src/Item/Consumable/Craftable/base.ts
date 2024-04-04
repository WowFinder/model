import { ActionLength } from '@wowfinder/ts-enums';
import type { ActionTime } from 'Action/ActionTime';
import { Consumable } from 'Item/Consumable/base';
import { Money } from 'Item/Money';
import type { ItemBuilder } from 'Item/base';

interface CraftableConsumableBuilder extends ItemBuilder {
    dc?: number;
}

abstract class CraftableConsumable extends Consumable {
    #dc: number;
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

export { CraftableConsumable, CraftableConsumableBuilder };
