import { type CharacterRequirementsPlaceholder } from '../../../Old.Character/Requirements/base';
import { CharacterOverride } from '../../../Old.Character/base/CharacterOverride';
import { type ShapeshiftBuilder, Shapeshift } from '../base';

class BearForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverride {
        const { stats } = base.baseProfile;
        return new CharacterOverride({
            key: `${base.key}-bear-${rank}`,
            baseStats: {
                ...stats,
                constitution: stats.constitution + 2 + 2 * rank,
            },
            featChoices: [],
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
        });
    }
}

export { BearForm };
