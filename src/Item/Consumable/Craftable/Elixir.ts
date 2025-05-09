import { BonusType } from '@wowfinder/ts-enums';
import { TypedSimpleBonus, type SimpleBonusBuilder } from '../../../Bonus';
import { Mass, Time } from '../../../Scalar';
import { Consumable } from '../base';
import { CraftableConsumable, CraftableConsumableBuilder } from './base';

type ElixirBuilder = CraftableConsumableBuilder & {
    duration: string;
    bonus: SimpleBonusBuilder;
};

class Elixir extends CraftableConsumable {
    readonly #duration: Time;
    readonly #bonus: TypedSimpleBonus;
    constructor({ duration, bonus, ...rest }: ElixirBuilder) {
        super(rest);
        this.#duration = Time.parseTime(duration);
        this.#bonus = new TypedSimpleBonus({
            ...bonus,
            type: BonusType.temporal,
        });
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

    get bonus(): TypedSimpleBonus {
        return this.#bonus;
    }

    static build(raw: any = {}): Elixir {
        return new Elixir({
            ...Consumable.generate('elixir', raw),
            duration: raw.duration,
            bonus: raw.bonus,
        });
    }
}

export { Elixir, type ElixirBuilder };
