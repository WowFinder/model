import { BonusType } from '@wowfinder/ts-enums';
import { Bonus, BonusBuilder } from '../../../Character/Bonus';
import { Mass, Time } from '../../../Scalar';
import { Consumable } from '../base';
import { CraftableConsumable, CraftableConsumableBuilder } from './base';

type WeaponOilBuilder = CraftableConsumableBuilder & {
    duration: string;
    bonus: Omit<BonusBuilder, 'type'>;
};

class WeaponOil extends CraftableConsumable {
    readonly #duration: Time;
    readonly #bonus: Bonus;
    constructor({ duration, bonus, ...rest }: WeaponOilBuilder) {
        super(rest);
        this.#duration = Time.parseTime(duration);
        this.#bonus = new Bonus({ ...bonus, type: BonusType.temporal });
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

    static build(raw: any = {}): WeaponOil {
        return new WeaponOil({
            ...Consumable.generate('weapon-oil', raw),
            duration: raw.duration,
            bonus: raw.bonus,
        });
    }
}

export { WeaponOil, type WeaponOilBuilder };
