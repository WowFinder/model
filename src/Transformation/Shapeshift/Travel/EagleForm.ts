import { FlyManeuverability } from '@wowfinder/ts-enums';
import { defaultSpeedUnit } from '../../../Creature/Speeds';
import { type CharacterRequirementsPlaceholder } from '../../../Old.Character/Requirements/base';
import { Shapeshift, type ShapeshiftBuilder } from '../base';
import { type CharacterOverridePlaceholder } from '../../CharacterOverridePlaceholder';

class EagleForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverridePlaceholder {
        const { speeds, stats } = base.baseProfile;
        return {
            key: `${base.key}-eagle-${rank}`,
            baseStats: stats,
            speeds: {
                ...speeds.export(),
                // TODO: recompute encumberance
                fly: 3.5 * speeds.base.as(defaultSpeedUnit),
                maneuverability: FlyManeuverability.perfect,
            },
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Rules for this form are still WiP
                Natural attacks: 2 sharp claws (1d6) and weak bite (1d4)
             */
        };
    }
}

export { EagleForm };
