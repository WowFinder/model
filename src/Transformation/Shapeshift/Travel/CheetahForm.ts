import { defaultSpeedUnit } from '../../../Creature/Speeds';
import { Shapeshift, type ShapeshiftBuilder } from '../base';
import { type CharacterOverridePlaceholder } from '../../CharacterOverridePlaceholder';
import { type CharacterBaseInterface } from '../../../Character';

class CheetahForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterBaseInterface,
        rank: number,
    ): CharacterOverridePlaceholder {
        const { speeds, stats } = base.baseProfile;
        return {
            key: `${base.key}-cheetah-${rank}`,
            baseStats: stats,
            speeds: {
                ...speeds.export(),
                base: 2 * speeds.base.as(defaultSpeedUnit),
            },
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Bonus feat: run
                Acrobatics: bonus when jumping with run
                Natural attacks: 2 claws (1d4) and bite (1d6)
             */
        };
    }
}

export { CheetahForm };
