import type { FeatsBonusBuilder } from '../../Bonus/FeatsBonus';
import { Feat } from '../../Character/Feats';

const defaultFeatsBonusBuilder: FeatsBonusBuilder = [] as const;

const mixedMartialFeatsBonusBuilder: FeatsBonusBuilder = [
    Feat.powerAttack,
    Feat.cleave,
];

const mixedCasterFeatsBonusBuilder: FeatsBonusBuilder = [
    Feat.combatCasting,
    Feat.arcaneArmorTraining,
    Feat.spellFocusEvocation,
    Feat.greaterSpellFocusEvocation,
];

export {
    defaultFeatsBonusBuilder,
    mixedMartialFeatsBonusBuilder,
    mixedCasterFeatsBonusBuilder,
};
