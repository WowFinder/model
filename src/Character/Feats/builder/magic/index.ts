import { Feat } from '../../Feat';
import type { FeatSpec } from '../../FeatSpec';
import { MagicFeat } from '../../core/magic';
import { build } from './helpers';
import { magicCraftingFeats } from './magicCraft';
import { metaMagicFeats } from './metaMagic';
import { spellFocusFeats } from './spellFocus';

const magicFeats: { [key in MagicFeat]: FeatSpec } = {
    combatCasting: build.magic(Feat.combatCasting),
    eschewMaterials: build.magic(Feat.eschewMaterials),
    improvedCounterspell: build.magic(Feat.improvedCounterspell),
    ...magicCraftingFeats,
    ...spellFocusFeats,
    ...metaMagicFeats,
};

export { magicFeats };
