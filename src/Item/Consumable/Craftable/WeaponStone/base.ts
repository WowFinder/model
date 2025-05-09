import type { DamageTypes } from '../../../../Damage/DamageType';
import { Mass, Time } from '../../../../Scalar';
import { CraftableConsumable, CraftableConsumableBuilder } from '../base';

type WeaponStoneBuilder = CraftableConsumableBuilder & {
    bonus: number;
    types: DamageTypes;
    duration?: string;
};

abstract class WeaponStone extends CraftableConsumable {
    readonly #bonus: number;
    readonly #types: DamageTypes;
    readonly #duration: Time;
    constructor({
        bonus,
        types,
        duration = '30m',
        ...rest
    }: WeaponStoneBuilder) {
        super(rest);
        this.#bonus = bonus;
        this.#types = types;
        this.#duration = Time.parseTime(duration);
    }

    get weight(): Mass {
        return Mass.asPounds(1);
    }

    protected get skillValueMultiplier(): number {
        return 5;
    }

    get bonus(): number {
        return this.#bonus;
    }

    get types(): DamageTypes {
        return this.#types;
    }

    get duration(): Time {
        return this.#duration;
    }
}

type TypedWeaponStoneBuilder = Omit<WeaponStoneBuilder, 'types'>;

export { type TypedWeaponStoneBuilder, WeaponStone, type WeaponStoneBuilder };
