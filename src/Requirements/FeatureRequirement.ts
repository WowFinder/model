import { type ClassFeature } from '@wowfinder/ts-enums';
import { Requirement } from './base';
import { type CharacterBaseInterface } from '../Character';
import { getClassFeatures } from '../Creature/Progression/Features/characterHelpers';

class ClassFeatureRequirement extends Requirement<CharacterBaseInterface> {
    readonly #feature: ClassFeature;
    constructor(feature: ClassFeature) {
        super();
        this.#feature = feature;
    }

    get feature(): ClassFeature {
        return this.#feature;
    }

    test(value: CharacterBaseInterface): boolean {
        const featureCount = value.baseProfile.features[this.#feature] ?? 0;
        return (
            featureCount > 0 ||
            getClassFeatures(value.classProgression).includes(this.#feature)
        );
    }
}

export { ClassFeatureRequirement };
