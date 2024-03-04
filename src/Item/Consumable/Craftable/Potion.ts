import { Dice, RollableValue } from '../../../Dice';
import { ActionTime } from '../../../Action';
import { Consumable } from '../base';
import { Mass } from '../../../Scalar';
import { ItemBuilder as CraftableConsumableBuilder } from '../../base';
import { CraftableConsumable } from './base';
import { ActionLength } from '@wowfinder/ts-enums';

interface RestoreValues {
    health: number;
    spells: number;
    sanity: number;
}

interface PotionBuilder extends CraftableConsumableBuilder {
    health?: RollableValue;
    spells?: RollableValue;
    sanity?: RollableValue;
}

class Potion extends CraftableConsumable {
    #health: Dice;
    #spells: Dice;
    #sanity: Dice;
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

export { Potion, RestoreValues, PotionBuilder };
