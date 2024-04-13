import { Feat } from '../../Feat';
import type { FeatSpec } from '../../FeatSpec';
import { MetaMagicFeat } from '../../core/magic/metaMagic';
import { build } from './helpers';

const metaMagicFeats: { [key in MetaMagicFeat]: FeatSpec } = {
    empowerSpell: build.meta(Feat.empowerSpell),
    enlargeSpell: build.meta(Feat.enlargeSpell),
    extendSpell: build.meta(Feat.extendSpell),
    heightenSpell: build.meta(Feat.heightenSpell),
    maximizeSpell: build.metaSingle(Feat.maximizeSpell),
    quickenSpell: build.metaSingle(Feat.quickenSpell),
    silentSpell: build.metaSingle(Feat.silentSpell),
    stillSpell: build.metaSingle(Feat.stillSpell),
    widenSpell: build.meta(Feat.widenSpell),
};

export { metaMagicFeats };
