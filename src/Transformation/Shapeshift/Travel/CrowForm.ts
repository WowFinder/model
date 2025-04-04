import { FlyManeuverability } from '@wowfinder/ts-enums';
import type { Character } from '../../../Character';
import { CharacterOverride } from '../../../Character/base/CharacterOverride';
import { defaultSpeedUnit } from '../../../Creature/Speeds';
import type { ShapeshiftBuilder } from '../base';
import { Shapeshift } from '../base';

class CrowForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(base: Character, rank: number): CharacterOverride {
        return new CharacterOverride({
            key: `${base.key}-crow-${rank}`,
            baseStats: base.stats.base,
            speeds: {
                ...base.speeds.export(),
                fly: 1.5 * base.speeds.base.as(defaultSpeedUnit),
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
