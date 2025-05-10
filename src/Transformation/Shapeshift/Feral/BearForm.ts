import { type CharacterBaseInterface } from '../../../Character';
import { type CharacterOverridePlaceholder } from '../../CharacterOverridePlaceholder';
import { type ShapeshiftBuilder, Shapeshift } from '../base';

class BearForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterBaseInterface,
        rank: number,
    ): CharacterOverridePlaceholder {
        const { stats } = base.baseProfile;
        return {
            key: `${base.key}-bear-${rank}`,
            baseStats: {
                ...stats,
                constitution: stats.constitution + 2 + 2 * rank,
            },
            size: Shapeshift.defaultSize(rank),
            naturalArmor: 2 + 2 * rank,
            /* TODO: #427 (epic)
                Natural attacks: 2 claws (1d4) and bite (1d6)
                Threat multiplier: x2
                Special abilities:
                    Demoralizing roar (Ex)
                    Maul (Ex)
                    ? Flagelo (Lacerate) (Ex)
                    Faerie fire ~ Feral (Sp)
            */
        };
    }
}

export { BearForm };
