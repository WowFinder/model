import { Stat } from '@wowfinder/ts-enums';
import { Feat } from '../../Feat';
import type { FeatSpec } from '../../FeatSpec';
import { CombatMobilityFeat } from '../../core/combat/mobility';
import { build, req } from '../helpers';

const combatMobilityFeats: { [key in CombatMobilityFeat]: FeatSpec } = {
    dodge: build.combat(Feat.dodge, req.stat(Stat.dexterity, 13)),
    // TODO #443: mobility, spring attack, wind stance, lightning stance
};

export { combatMobilityFeats };
