import { BonusType, TimeUnit } from '@wowfinder/ts-enums';
import { Bonus, BonusBuilder } from '../../../Old.Character/Bonus';
import { Mass, Time } from '../../../Scalar';
import { Shape, buildShape } from '../../Gear';
import type { ItemBuilder as CraftableConsumableBuilder } from '../../base';
import { CraftableConsumable } from './base';

type GearEnchantBuilder = CraftableConsumableBuilder & {
    bonus: Omit<BonusBuilder, 'type'>;
    slots: string[];
};

class GearEnchant extends CraftableConsumable {
    readonly #bonus: Bonus;
    readonly #slots: Shape;

    constructor({ bonus, slots, ...rest }: GearEnchantBuilder) {
        super(rest);
        this.#bonus = new Bonus({ ...bonus, type: BonusType.gear });
        this.#slots = buildShape(slots);
    }

    get useTime(): Time {
        return new Time({ value: 1, unit: TimeUnit.minute });
    }

    get bonus(): Bonus {
        return this.#bonus;
    }

    get slots(): Shape {
        return this.#slots.map(slot => ({ ...slot }));
    }

    get weight(): Mass {
        return Mass.asPounds(0.1);
    }

    protected get skillValueMultiplier(): number {
        return 20;
    }

    static build(raw: any = {}): GearEnchant {
        return new GearEnchant({
            ...CraftableConsumable.generate('enchant', raw),
            bonus: raw.bonus,
            slots: raw.slots,
        });
    }
}

export { GearEnchant, type GearEnchantBuilder };
