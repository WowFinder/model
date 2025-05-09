import { FlyManeuverability } from '@wowfinder/ts-enums';
import { defaultSpeedUnit } from '../../../Creature/Speeds';
import { type CharacterRequirementsPlaceholder } from '../../../Old.Character/Requirements/base';
import { Shapeshift, type ShapeshiftBuilder } from '../base';
import { type CharacterOverridePlaceholder } from '../../CharacterOverridePlaceholder';

class CrowForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverridePlaceholder {
        const { speeds, stats } = base.baseProfile;
        return {
            key: `${base.key}-crow-${rank}`,
            baseStats: stats,
            speeds: {
                ...speeds.export(),
                fly: 1.5 * speeds.base.as(defaultSpeedUnit),
                maneuverability: FlyManeuverability.average,
            },
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Rules for this form are still WiP
                Natural attacks: weak bite (1d4)
             */
        };
    }
}

export { CrowForm };
