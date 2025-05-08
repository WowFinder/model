import { defaultSpeedUnit } from '../../../Creature/Speeds';
import { type CharacterRequirementsPlaceholder } from '../../../Old.Character/Requirements/base';
import { CharacterOverride } from '../../../Old.Character/base';
import { Shapeshift, type ShapeshiftBuilder } from '../base';

class DolphinForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverride {
        const speeds = base.baseProfile.speedsProfile;
        return new CharacterOverride({
            key: `${base.key}-dolphin-${rank}`,
            baseStats: base.baseProfile.statsProfile,
            speeds: {
                ...speeds.export(),
                base: 0,
                swim: 1.5 * speeds.base.as(defaultSpeedUnit),
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Special bonus: Hold breath (5 * constitution rounds)
                Special bonus: Ignore water pressure: 100'
                Natural attacks: weak bite (1d4)
             */
        });
    }
}

export { DolphinForm };
