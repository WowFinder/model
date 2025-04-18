import { FeatFlag, Stat, ClassFeature } from '@wowfinder/ts-enums';
import { ClassFeatureFeat } from '../core/classFeature';
import { Feat } from '../Feat';
import type { FeatSpec } from '../FeatSpec';
import { allOf, either, feat, req, Reqs } from './helpers';

const build = {
    feature: (key: Feat, feature: ClassFeature, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs, ...req.features(feature)), [FeatFlag.class]),
    channelEnh: (key: Feat, ...reqs: Reqs): FeatSpec =>
        // TODO #440 Include sub-feature for granted channel abilities
        feat(
            key,
            allOf(...reqs, either(...req.features(ClassFeature.channel))),
            [FeatFlag.class, FeatFlag.channel],
        ),
    channelType: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs, ...req.features(ClassFeature.channel)), [
            FeatFlag.class,
            FeatFlag.channel,
        ]),
};

const classFeatureFeats: { [key in ClassFeatureFeat]: FeatSpec } = {
    // Class features (+ channel)
    // TODO #439: Include class feature requirements!
    extraKi: build.feature(Feat.extraKi, ClassFeature.kiPool),
    extraRage: build.feature(Feat.extraRage, ClassFeature.rage),
    channelAlignment: build.channelType(Feat.channelAlignment),
    commandUndead: build.channelType(Feat.commandUndead),
    elementalChannel: build.channelType(Feat.elementalChannel),
    extraChannel: build.channelEnh(Feat.extraChannel),
    improvedChannel: build.channelEnh(Feat.improvedChannel),
    selectiveChannel: build.channelEnh(
        Feat.selectiveChannel,
        req.stat(Stat.charisma, 13),
    ),
    turnUndead: build.channelType(Feat.turnUndead),
    channelSmite: feat(
        Feat.channelSmite,
        allOf(...req.features(ClassFeature.channel)),
        [FeatFlag.class, FeatFlag.channel, FeatFlag.combat],
    ),
};

export { classFeatureFeats };
