import { ClassFeature as ProgressionFeature } from '@wowfinder/ts-enums';

type ProgressionFeatureEntry = {
    level: number;
    feature: string;
};

type FeaturesList = {
    level: number;
    feature: ProgressionFeature;
}[];

type ProgressionFeaturesCondensed = {
    feature: ProgressionFeature;
    count: number;
}[];

class CondensedProgressionFeatures {
    readonly #raw: ProgressionFeaturesCondensed;
    constructor(features: ProgressionFeature[]) {
        const counts: { [key: string]: number } = {};
        for (const f of features) {
            if (!(f in counts)) {
                counts[f] = 0;
            }
            counts[f]++;
        }
        this.#raw = Object.keys(counts).map(k => ({
            feature: k as ProgressionFeature,
            count: counts[k],
        }));
    }

    count(feature: string): number {
        const match = this.#raw.find(f => f.feature === feature);
        return match?.count ?? 0;
    }

    get list(): ProgressionFeaturesCondensed {
        return [...this.#raw];
    }
}

export {
    ProgressionFeature,
    CondensedProgressionFeatures,
    type ProgressionFeatureEntry,
    type FeaturesList,
    type ProgressionFeaturesCondensed,
};
