import { type CharacterRequirementsPlaceholder } from '../../../Old.Character/Requirements/base';
import { type CharacterOverridePlaceholder } from '../../CharacterOverridePlaceholder';
import { Shapeshift, type ShapeshiftBuilder } from '../base';

class CatForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverridePlaceholder {
        const { stats } = base.baseProfile;
        return {
            key: `${base.key}-cat-${rank}`,
            baseStats: {
                ...stats,
                dexterity: stats.dexterity + 2 + 2 * rank,
            },
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Stealth: +8 +4 * rank
                Natural attacks: 2 sharp claws (1d6) and weak bite (1d4)
                Threat multiplier: x½
                Combo points
                Special abilities: TBD / Pending rules review
            */
        };
    }
}

export { CatForm };
