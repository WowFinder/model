import { Feat } from 'Character/Feats/Feat';
import type { FeatSpec } from 'Character/Feats/FeatSpec';
import { CombatVitalStrikeFeat } from 'Character/Feats/core/combat/vitalStrike';
import { build, req } from '../helpers';

const combatVitalStrikeFeats: { [key in CombatVitalStrikeFeat]: FeatSpec } = {
    vitalStrike: build.combat(Feat.vitalStrike, req.level.bab(1)),
    improvedVitalStrike: build.combat(
        Feat.improvedVitalStrike,
        ...req.feats('vitalStrike'),
        req.level.bab(11),
    ),
    greaterVitalStrike: build.combat(
        Feat.greaterVitalStrike,
        ...req.feats('improvedVitalStrike'),
        req.level.bab(16),
    ),
};

export { combatVitalStrikeFeats };
