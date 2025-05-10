import { defaultSpeedUnit } from '../../../Creature/Speeds';
import { Shapeshift, type ShapeshiftBuilder } from '../base';
import { type CharacterOverridePlaceholder } from '../../CharacterOverridePlaceholder';
import { type CharacterBaseInterface } from '../../../Character';

class DolphinForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterBaseInterface,
        rank: number,
    ): CharacterOverridePlaceholder {
        const { speeds, stats } = base.baseProfile;
        return {
            key: `${base.key}-dolphin-${rank}`,
            baseStats: stats,
            speeds: {
                ...speeds.export(),
                base: 0,
                swim: 1.5 * speeds.base.as(defaultSpeedUnit),
            },
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Special bonus: Hold breath (5 * constitution rounds)
                Special bonus: Ignore water pressure: 100'
                Natural attacks: weak bite (1d4)
             */
        };
    }
}

export { DolphinForm };
