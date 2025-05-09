import { FeatFlag } from '@wowfinder/ts-enums';
import { Feat } from '../../Feat';
import type { FeatSpec } from '../../FeatSpec';
import { allOf, feat, type PendingFeatReqs, req, type Reqs } from '../helpers';

const build = {
    magic: (key: Feat, pending?: PendingFeatReqs, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.magic]),
    item: (key: Feat, clevel: number): FeatSpec =>
        feat(key, req.level.caster(clevel), [
            FeatFlag.magic,
            FeatFlag.itemCreation,
        ]),
    focus: (key: Feat, prev?: Feat): FeatSpec =>
        feat(
            key,
            req.none,
            [FeatFlag.magic, FeatFlag.spellFocus],
            prev ? [prev] : [],
        ),
    meta: (key: Feat): FeatSpec =>
        feat(key, req.none, [
            FeatFlag.magic,
            FeatFlag.metaMagic,
            FeatFlag.multiple,
        ]),
    metaSingle: (key: Feat): FeatSpec =>
        feat(key, req.none, [FeatFlag.magic, FeatFlag.metaMagic]),
};

export { build };
