import { Character } from '../../../Character';
import { CharacterOverride } from '../../../Character/base';
import { Shapeshift, ShapeshiftBuilder } from '../base';

class MoonkinForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(base: Character, rank: number): CharacterOverride {
        return new CharacterOverride({
            key: `${base.key}-moonkin-${rank}`,
            baseStats: {
                ...base.stats.base,
                charisma: base.stats.base.charisma + 2 + 2 * rank,
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
        });
    }
}

export { MoonkinForm };
