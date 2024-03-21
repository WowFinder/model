import { ClassFeature } from '@wowfinder/ts-enums';

type ClassFeatureEntry = {
    level: number;
    feature: string;
};

type FeaturesList = {
    level: number;
    feature: ClassFeature;
}[];

type ClassFeaturesCondensed = { feature: ClassFeature; count: number }[];

class CondensedClassFeatures {
    #raw: ClassFeaturesCondensed;
    constructor(features: ClassFeature[]) {
        const counts: { [key: string]: number } = {};
        for (const f of features) {
            if (!(f in counts)) {
                counts[f] = 0;
            }
            counts[f]++;
        }
        this.#raw = Object.keys(counts).map(k => ({
            feature: k as ClassFeature,
            count: counts[k],
        }));
    }

    count(feature: string): number {
        const match = this.#raw.find(f => f.feature === feature);
        return match?.count ?? 0;
    }

    get list(): ClassFeaturesCondensed {
        return [...this.#raw];
    }
}

export { ClassFeature, CondensedClassFeatures };
export type { ClassFeatureEntry, FeaturesList, ClassFeaturesCondensed };
