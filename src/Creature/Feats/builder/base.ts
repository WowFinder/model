import { Stat } from '@wowfinder/ts-enums';
import { Feat } from '../Feat';
import type { FeatSpec } from '../FeatSpec';
import { BaseFeat } from '../core/base';
import { build, req } from './helpers';

const baseFeats: { [key in BaseFeat]: FeatSpec } = {
    endurance: build.basic(Feat.endurance),
    diehard: build.basic(Feat.diehard, req.feats(Feat.endurance)),
    fleet: build.basic(Feat.fleet),
    leadership: build.basic(Feat.leadership, [], req.level.global(7)),
    nimbleMoves: build.basic(
        Feat.nimbleMoves,
        [],
        req.stat(Stat.dexterity, 13),
    ),
    acrobaticSteps: build.basic(
        Feat.acrobaticSteps,
        req.feats(Feat.nimbleMoves),
        req.stat(Stat.dexterity, 15),
    ),
    run: build.basic(Feat.run),
    greatFortitude: build.save(Feat.greatFortitude),
    improvedGreatFortitude: build.save(
        Feat.improvedGreatFortitude,
        req.feats(Feat.greatFortitude),
    ),
    ironWill: build.save(Feat.ironWill),
    improvedIronWill: build.save(
        Feat.improvedIronWill,
        req.feats(Feat.ironWill),
    ),
    lightningReflexes: build.save(Feat.lightningReflexes),
    improvedLightningReflexes: build.save(
        Feat.improvedLightningReflexes,
        req.feats(Feat.lightningReflexes),
    ),
};

export { baseFeats };
