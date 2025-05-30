import { ActionTime } from '../../Action/ActionTime';
import type { Money } from '../Money';
import { Item, ItemBuilder } from '../base';

type ConsumableRawBuilder = ItemBuilder & {
    key?: string;
};

abstract class Consumable extends Item {
    abstract get useTime(): ActionTime;

    abstract get value(): Money; // TODO: #553 Move up to Item

    static preBuild(raw: any): ItemBuilder {
        return {
            ...Item.preBuild(raw),
        };
    }

    protected static generate(
        infix: string,
        raw: ConsumableRawBuilder,
    ): ItemBuilder {
        return {
            ...Consumable.preBuild(raw),
            label: `consumable.${infix}.${raw.key ?? ''}`,
        };
    }
}

export { Consumable, type ConsumableRawBuilder };
