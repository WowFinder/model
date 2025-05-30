import { type CharacterBaseInterface } from '../../../Character';
import { defaultSpeedUnit } from '../../../Scalar';
import { CharacterOverridePlaceholder } from '../../CharacterOverridePlaceholder';
import { Shapeshift, type ShapeshiftBuilder } from '../base';

class StagForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterBaseInterface,
        rank: number,
    ): CharacterOverridePlaceholder {
        const { speeds, stats } = base.baseProfile;
        return {
            key: `${base.key}-stag-${rank}`,
            baseStats: stats,
            speeds: {
                ...speeds.export(),
                base: 3.5 * speeds.base.as(defaultSpeedUnit),
            },
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Rules for this form are still WiP
                Bonus: running endurance
                Bonus: enhanced carrying capacity (up to 2 passengers)
                Natural attacks: 2 horns (1d4) and bite (1d6)
             */
        };
    }
}

export { StagForm };
