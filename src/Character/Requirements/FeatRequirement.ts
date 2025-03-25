import type { Character } from '../';
import { feats } from '../Feats';
import type { Feat } from '../Feats/Feat';
import { FeatSpec } from '../Feats/FeatSpec';
import type { Requirement } from './base';

class FeatRequirement implements Requirement<Iterable<FeatSpec>> {
    #feat: Feat;
    constructor(feat: Feat) {
        this.#feat = feat;
    }

    test(value: Iterable<FeatSpec>): boolean {
        return [...value].some(f => f.label === this.#feat);
    }
}

class CharacterFeatRequirement implements Requirement<Character> {
    #feat: Feat;
    constructor(feat: Feat) {
        this.#feat = feat;
    }

    test(value: Character): boolean {
        return value.feats.some(
            f =>
                f.feat === this.#feat && feats[f.feat].requirements.test(value),
        );
    }
}

export { CharacterFeatRequirement, FeatRequirement };
