import { type CombatFeat } from '../../core/combat';
import type { FeatSpec } from '../../FeatSpec';
import { combatBaseFeats } from './base';
import { combatDualWieldFeats } from './dual';
import { combatMobilityFeats } from './mobility';
import { combatPowerFeats } from './power';
import { combatShieldFeats } from './shield';
import { combatVitalStrikeFeats } from './vitalStrike';

const combatFeats: { [key in CombatFeat]: FeatSpec } = {
    // TODO: Implement missing feats (inherited from https://www.github.com/edurne85/wowfinder/issues/443)
    ...combatBaseFeats,
    // Combat expertise feats
    // Critical feats
    ...combatMobilityFeats,
    // Unarmed combat feats
    // Shooting feats
    ...combatPowerFeats,
    // Mounted combat feats
    ...combatShieldFeats,
    ...combatDualWieldFeats,
    ...combatVitalStrikeFeats,
};

export { combatFeats };
