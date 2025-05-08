import { FlyManeuverability } from '@wowfinder/ts-enums';
import { defaultSpeedUnit } from '../../../Creature/Speeds';
import { type CharacterRequirementsPlaceholder } from '../../../Old.Character/Requirements/base';
import { CharacterOverride } from '../../../Old.Character/base';
import { Shapeshift, type ShapeshiftBuilder } from '../base';

class CrowForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverride {
        const speeds = base.baseProfile.speedsProfile;
        return new CharacterOverride({
            key: `${base.key}-crow-${rank}`,
            baseStats: base.baseProfile.statsProfile,
            speeds: {
                base: speeds.baseSpeed,
                swim: speeds.swimSpeed,
                burrow: speeds.burrowSpeed,
                climb: speeds.climbSpeed,
                // TODO: recompute encumberance
                fly: 1.5 * speeds.baseSpeed.as(defaultSpeedUnit),
                maneuverability: FlyManeuverability.average,
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Rules for this form are still WiP
                Natural attacks: weak bite (1d4)
             */
        });
    }
}

export { CrowForm };
