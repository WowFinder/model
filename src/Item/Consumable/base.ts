import { type ActionTime } from '../../Action/ActionTime';
import { Item, type ItemBuilder } from '../base';

type ConsumableRawBuilder = ItemBuilder & {
    key?: string;
};

abstract class Consumable extends Item {
    abstract get useTime(): ActionTime;

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
