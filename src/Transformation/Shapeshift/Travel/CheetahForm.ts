import { defaultSpeedUnit } from '../../../Creature/Speeds';
import { type CharacterRequirementsPlaceholder } from '../../../Old.Character/Requirements/base';
import { CharacterOverride } from '../../../Old.Character/base';
import { Shapeshift, type ShapeshiftBuilder } from '../base';

class CheetahForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverride {
        const speeds = base.baseProfile.speedsProfile;
        return new CharacterOverride({
            key: `${base.key}-cheetah-${rank}`,
            baseStats: base.baseProfile.statsProfile,
            speeds: {
                ...speeds.export(),
                base: 2 * speeds.base.as(defaultSpeedUnit),
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Bonus feat: run
                Acrobatics: bonus when jumping with run
                Natural attacks: 2 claws (1d4) and bite (1d6)
             */
        });
    }
}

export { CheetahForm };
