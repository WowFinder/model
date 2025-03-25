import type { ClassFeature } from '@wowfinder/ts-enums';
import type { Character } from '../';
import { Requirement } from './base';

class ClassFeatureRequirement extends Requirement<Character> {
    #feature: ClassFeature;
    constructor(feature: ClassFeature) {
        super();
        this.#feature = feature;
    }

    test(value: Character): boolean {
        return value.classFeaturesCondensed.count(this.#feature) > 0;
    }
}

export { ClassFeatureRequirement };
