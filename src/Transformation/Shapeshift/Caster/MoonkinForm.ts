import { type CharacterBaseInterface } from '../../../Character';
import { CharacterOverridePlaceholder } from '../../CharacterOverridePlaceholder';
import { Shapeshift, ShapeshiftBuilder } from '../base';

class MoonkinForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterBaseInterface,
        rank: number,
    ): CharacterOverridePlaceholder {
        const { stats } = base.baseProfile;
        return {
            key: `${base.key}-moonkin-${rank}`,
            baseStats: {
                ...stats,
                charisma: stats.charisma + 2 + 2 * rank,
            },
            /* TODO:
                Touch attack rolls (ranged): +3 + 3 * rank
                specific spells
             */
            casterLevels: {
                spontaneous: Shapeshift.effectiveDruidLevel(base),
            },
            size: 1,
            naturalArmor: 2 + 2 * rank, // TODO switch to deflection bonus
        };
    }
}

export { MoonkinForm };
