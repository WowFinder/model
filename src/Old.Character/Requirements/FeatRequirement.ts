import { feats } from '../Feats';
import type { Feat } from '../Feats/Feat';
import { FeatSpec } from '../Feats/FeatSpec';
import {
    type CharacterRequirements,
    type CharacterRequirementsPlaceholder,
    type Requirement,
} from './base';

class FeatRequirement implements Requirement<Iterable<FeatSpec>> {
    readonly #feat: Feat;
    constructor(feat: Feat) {
        this.#feat = feat;
    }

    test(value: Iterable<FeatSpec>): boolean {
        return [...value].some(f => f.label === this.#feat);
    }
}

class CharacterFeatRequirement implements CharacterRequirements {
    readonly #feat: Feat;
    constructor(feat: Feat) {
        this.#feat = feat;
    }

    test(value: CharacterRequirementsPlaceholder): boolean {
        const fkeys = Object.keys(value.baseProfile.featsProfile) as Feat[];
        return fkeys.some(
            f => f === this.#feat && feats[f].requirements.test(value),
        );
    }
}

export { CharacterFeatRequirement, FeatRequirement };
