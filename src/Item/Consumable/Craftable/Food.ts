import { BonusType } from '@wowfinder/ts-enums';
import { Bonus, BonusBuilder } from '../../../Character/Bonus';
import { Dice } from '../../../Dice';
import { Mass, Time } from '../../../Scalar';
import { Consumable } from '../base';
import { PotionBuilder, RestoreValues } from './Potion';
import { CraftableConsumable, CraftableConsumableBuilder } from './base';

type FoodBuilder = CraftableConsumableBuilder &
    PotionBuilder & {
        duration?: string;
        bonus: Omit<BonusBuilder, 'type'>;
    };

const defaultFoodDuration = '15m';

class Food extends CraftableConsumable {
    readonly #duration: Time;
    readonly #bonus: Bonus;
    readonly #health: Dice;
    readonly #spells: Dice;
    readonly #sanity: Dice;
    constructor({
        duration = defaultFoodDuration,
        bonus,
        health = 0,
        spells = 0,
        sanity = 0,
        ...rest
    }: FoodBuilder) {
        super(rest);
        this.#duration = Time.parseTime(duration);
        this.#bonus = new Bonus({ ...bonus, type: BonusType.temporal });
        this.#health = Dice.make(health);
        this.#spells = Dice.make(spells);
        this.#sanity = Dice.make(sanity);
    }

    get weight(): Mass {
        return Mass.asPounds(0.5);
    }

    protected get skillValueMultiplier(): number {
        return 20;
    }

    get duration(): Time {
        return this.#duration;
    }

    get bonus(): BonusBuilder {
        return this.#bonus;
    }

    static build(raw: any = {}): Food {
        return new Food({
            ...Consumable.generate('food', raw),
            duration: raw.duration,
            bonus: raw.bonus,
            health: raw.health,
            spells: raw.spells,
            sanity: raw.sanity,
        });
    }

    roll(): RestoreValues {
        return {
            health: this.#health.roll(),
            spells: this.#spells.roll(),
            sanity: this.#sanity.roll(),
        };
    }
}

export { Food, type FoodBuilder };
