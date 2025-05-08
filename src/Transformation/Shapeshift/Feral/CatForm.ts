import { type CharacterRequirementsPlaceholder } from '../../../Character/Requirements/base';
import { CharacterOverride } from '../../../Character/base';
import { Shapeshift, type ShapeshiftBuilder } from '../base';

class CatForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverride {
        const stats = base.baseProfile.statsProfile;
        return new CharacterOverride({
            key: `${base.key}-cat-${rank}`,
            baseStats: {
                ...stats,
                dexterity: stats.dexterity + 2 + 2 * rank,
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Stealth: +8 +4 * rank
                Natural attacks: 2 sharp claws (1d6) and weak bite (1d4)
                Threat multiplier: x½
                Combo points
                Special abilities: TBD / Pending rules review
            */
        });
    }
}

export { CatForm };
