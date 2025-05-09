import type { ClassFeature } from '@wowfinder/ts-enums';
import { type CharacterRequirementsPlaceholder, Requirement } from './base';

class ClassFeatureRequirement extends Requirement<CharacterRequirementsPlaceholder> {
    readonly #feature: ClassFeature;
    constructor(feature: ClassFeature) {
        super();
        this.#feature = feature;
    }

    test(value: CharacterRequirementsPlaceholder): boolean {
        const featureCount = value.baseProfile.features[this.#feature] ?? 0;
        return featureCount > 0;
    }
}

export { ClassFeatureRequirement };
