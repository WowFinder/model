import { FeatSpec } from '../Feats/FeatSpec';
import {
    type CharacterRequirements,
    type CharacterRequirementsPlaceholder,
    type Requirement,
} from './base';

class FeatRequirement implements Requirement<Iterable<FeatSpec>> {
    readonly #feat: FeatSpec;
    constructor(feat: FeatSpec) {
        this.#feat = feat;
    }

    test(value: Iterable<FeatSpec>): boolean {
        return [...value].some(f => f === this.#feat);
    }
}

class CharacterFeatRequirement implements CharacterRequirements {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    readonly #feat: FeatSpec;
    constructor(feat: FeatSpec) {
        this.#feat = feat;
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    test(value: CharacterRequirementsPlaceholder): boolean {
        // TODO: Reimplement (avoid circular dependencies!)
        return false;
    }
}

export { CharacterFeatRequirement, FeatRequirement };
