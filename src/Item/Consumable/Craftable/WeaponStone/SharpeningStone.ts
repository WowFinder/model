import { DamageType } from '@wowfinder/ts-enums';
import { CraftableConsumable } from '../base';
import { TypedWeaponStoneBuilder, WeaponStone } from './base';

class SharpeningStone extends WeaponStone {
    constructor(data: TypedWeaponStoneBuilder) {
        super({
            ...data,
            types: {
                [DamageType.piercing]: true,
                [DamageType.slashing]: true,
            },
        });
    }

    static build(raw: any = {}): SharpeningStone {
        return new SharpeningStone({
            ...CraftableConsumable.generate('stone.sharp', raw),
            bonus: raw.bonus,
        });
    }
}

export { SharpeningStone };
