import type { ClassFeature } from '@wowfinder/ts-enums';
import { Requirement } from './base';
import { type CharacterBaseInterface } from '../../Character';

class ClassFeatureRequirement extends Requirement<CharacterBaseInterface> {
    readonly #feature: ClassFeature;
    constructor(feature: ClassFeature) {
        super();
        this.#feature = feature;
    }

    test(value: CharacterBaseInterface): boolean {
        const featureCount = value.baseProfile.features[this.#feature] ?? 0;
        return featureCount > 0;
    }
}

export { ClassFeatureRequirement };
