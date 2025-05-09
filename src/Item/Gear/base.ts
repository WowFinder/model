import { BonusType, Size } from '@wowfinder/ts-enums';
import { TypedSimpleBonus, MultiBonus } from '../../Bonus';
import { Mass, Weight } from '../../Scalar';
import { Money } from '../Money';
import { Item, ItemBuilder } from '../base';
import { Shape, buildShape, explodeShape } from './Slot';

type GearBuilder = ItemBuilder & {
    shape: string[];
    size: Size;
    bonuses?: TypedSimpleBonus;
    weight: Weight;
};

class Gear extends Item {
    #shape: Shape;
    #size: Size;
    #bonuses: TypedSimpleBonus;
    #weight: Mass;

    constructor({
        shape,
        size,
        weight,
        bonuses = TypedSimpleBonus.typedZero(BonusType.gear),
        ...args
    }: GearBuilder) {
        super(args);
        this.#shape = buildShape(shape);
        this.#size = size;
        this.#bonuses = bonuses.retyped(BonusType.gear);
        this.#weight = Mass.asPounds(weight);
    }

    static copy(gear: Gear): Gear {
        return new Gear({
            label: gear.label,
            shape: explodeShape(gear.#shape),
            size: gear.#size,
            weight: gear.#weight,
            bonuses: gear.#bonuses, // TODO #430: make copy
        });
    }

    get shape(): Shape {
        return [...this.#shape];
    }

    get size(): Size {
        return this.#size;
    }

    get bonuses(): TypedSimpleBonus {
        return this.#bonuses.retyped(BonusType.gear);
    }

    get value(): Money {
        return Money.zero;
    }

    get weight(): Mass {
        return this.#weight;
    }

    get fullBonus(): MultiBonus {
        return new MultiBonus({ [BonusType.gear]: this.bonuses.export() });
    }

    get $type(): string {
        return '';
    }

    static preBuild(raw: any): GearBuilder {
        return {
            ...Item.preBuild(raw),
            shape: (raw.shape as string[]) || [],
            size: (raw.size as Size) || 0,
            weight: raw.weight || 0,
            bonuses: new TypedSimpleBonus(raw.bonuses || {}),
        };
    }

    static build(raw: any): Gear {
        return new Gear(Gear.preBuild(raw));
    }

    /** @deprecated */
    static load(): any {
        throw new Error('Not implemented.');
    }
}

export type { GearBuilder };

export { Gear };
