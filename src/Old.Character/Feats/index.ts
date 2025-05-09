import {
    baseFeats,
    classFeatureFeats,
    combatFeats,
    magicFeats,
    weaponFeats,
} from './builder';
import { applyPendingReqs } from './builder/helpers';
import { Feat } from './Feat';
import { FeatSpec } from './FeatSpec';

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
export { Feat, FeatSpec, frozenFeats as feats };
