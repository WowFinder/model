import { DamageType } from '@wowfinder/ts-enums';
import { CraftableConsumable } from '../base';
import { TypedWeaponStoneBuilder, WeaponStone } from './base';

class WeightStone extends WeaponStone {
    constructor(data: TypedWeaponStoneBuilder) {
        super({
            ...data,
            types: {
                [DamageType.bludgeoning]: true,
            },
        });
    }

    static build(raw: any = {}): WeightStone {
        return new WeightStone({
            ...CraftableConsumable.generate('stone.weight', raw),
            bonus: raw.bonus,
        });
    }
}

export { WeightStone };
