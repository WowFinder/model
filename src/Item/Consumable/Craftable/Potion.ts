import { ActionLength } from '@wowfinder/ts-enums';
import { ActionTime } from '../../../Action/ActionTime';
import { Dice, RollableValue } from '../../../Dice';
import { Mass } from '../../../Scalar';
import type { ItemBuilder as CraftableConsumableBuilder } from '../../base';
import { Consumable } from '../base';
import { CraftableConsumable } from './base';

type RestoreValues = {
    health: number;
    spells: number;
    sanity: number;
};

type PotionBuilder = CraftableConsumableBuilder & {
    health?: RollableValue;
    spells?: RollableValue;
    sanity?: RollableValue;
};

class Potion extends CraftableConsumable {
    readonly #health: Dice;
    readonly #spells: Dice;
    readonly #sanity: Dice;
    constructor({
        health = 0,
        spells = 0,
        sanity = 0,
        ...rest
    }: PotionBuilder) {
        super(rest);
        this.#health = Dice.make(health);
        this.#spells = Dice.make(spells);
        this.#sanity = Dice.make(sanity);
    }

    get useTime(): ActionTime {
        return ActionLength.move;
    }

    get weight(): Mass {
        return Mass.asPounds(0.5);
    }

    protected get skillValueMultiplier(): number {
        return 20;
    }

    get health(): Dice {
        return this.#health;
    }

    get spells(): Dice {
        return this.#spells;
    }

    get sanity(): Dice {
        return this.#sanity;
    }

    roll(): RestoreValues {
        return {
            health: this.#health.roll(),
            spells: this.#spells.roll(),
            sanity: this.#sanity.roll(),
        };
    }

    static build(raw: any = {}): Potion {
        return new Potion({
            ...Consumable.generate('potion', raw),
            health: raw.health,
            spells: raw.spells,
            sanity: raw.sanity,
        });
    }
}

export { Potion, type PotionBuilder, type RestoreValues };
