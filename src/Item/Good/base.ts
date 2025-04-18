import { Money, asMoney } from '../Money';
import { Item, ItemBuilder } from '../base';
import { rarityMultipliers } from '../Rarity';
import { Rarity } from '@wowfinder/ts-enums';

type GoodBuilder = ItemBuilder & {
    label: string;
    iLevel: number;
};

type RawGoodBuilder = Partial<Omit<ItemBuilder, 'rarity'>> & {
    key?: string;
    iLevel?: number;
    rarity?: Rarity | string;
};

abstract class Good extends Item {
    readonly #iLevel: number;

    constructor(args: GoodBuilder) {
        super(args);
        this.#iLevel = args.iLevel;
    }

    get iLevel(): number {
        return this.#iLevel;
    }

    abstract get valueMultiplier(): number;
    get value(): Money {
        return asMoney(
            this.valueMultiplier *
                rarityMultipliers[this.rarity] *
                this.#iLevel ** 2,
        );
    }

    static preBuild(raw: any): GoodBuilder {
        return {
            ...Item.preBuild(raw),
            iLevel: (raw.iLevel as number) || 0,
            rarity: (raw.rarity as Rarity) || Rarity.common,
        };
    }

    protected static generate(infix: string, raw: RawGoodBuilder): GoodBuilder {
        return {
            ...Good.preBuild(raw),
            label: `good.${infix}.${raw.key ?? ''}`,
        };
    }
}

export { Good, type GoodBuilder, type RawGoodBuilder };
