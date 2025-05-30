import { Stat } from '@wowfinder/ts-enums';
import { CombatPowerFeat } from '../../core/combat/power';
import { Feat } from '../../Feat';
import type { FeatSpec } from '../../FeatSpec';
import { build, req } from '../helpers';

const combatPowerFeats: { [key in CombatPowerFeat]: FeatSpec } = {
    powerAttack: build.combat(
        Feat.powerAttack,
        [],
        req.stat(Stat.strength, 13),
        req.level.bab(1),
    ),
    cleave: build.combat(Feat.cleave, req.feats('powerAttack')),
    greatCleave: build.combat(
        Feat.greatCleave,
        req.feats('cleave'),
        req.level.bab(4),
    ),
    // TODO #443: Imp. Bull Rush, Greater Bull Rush, Imp. Overrun, Greater Overrun, Imp. Sunder, Greater Sunder
};

export { combatPowerFeats };
