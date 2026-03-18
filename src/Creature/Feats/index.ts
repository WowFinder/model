import {
    baseFeats,
    classFeatureFeats,
    combatFeats,
    magicFeats,
    weaponFeats,
} from './builder';
import { applyPendingReqs } from './builder/helpers';
import { type Feat } from './Feat';
import { type FeatSpec } from './FeatSpec';

const feats: { [key in Feat]: FeatSpec } = {
    ...baseFeats,
    ...classFeatureFeats,
    ...magicFeats,
    ...combatFeats,
    ...weaponFeats,
};

applyPendingReqs(feats);

Object.freeze(feats);

const frozenFeats = feats as Readonly<typeof feats>;

export { frozenFeats as feats };
export { Feat } from './Feat';
export { FeatSpec } from './FeatSpec';
