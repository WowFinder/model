import { Feat } from 'Character/Feats/Feat';
import type { FeatSpec } from 'Character/Feats/FeatSpec';
import { MagicCraftingFeat } from 'Character/Feats/core/magic/magicCraft';
import { build } from './helpers';

const magicCraftingFeats: { [key in MagicCraftingFeat]: FeatSpec } = {
    scribeScroll: build.item(Feat.scribeScroll, 1),
    brewPotion: build.item(Feat.brewPotion, 3),
    craftWondrousItem: build.item(Feat.craftWondrousItem, 3),
    craftArmsArmor: build.item(Feat.craftArmsArmor, 5),
    craftWand: build.item(Feat.craftWand, 5),
    craftRing: build.item(Feat.craftRing, 7),
    craftRod: build.item(Feat.craftRod, 9),
    craftStaff: build.item(Feat.craftStaff, 11),
};

export { magicCraftingFeats };
