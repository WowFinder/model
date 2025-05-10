import { type CharacterBaseInterface } from '../../Character';
import { Feat } from '../../Creature/Feats/Feat';
import { type CharacterRequirements, type Requirement } from './base';

class FeatRequirement implements Requirement<Iterable<Feat>> {
    readonly #feat: Feat;
    constructor(feat: Feat) {
        this.#feat = feat;
    }

    test(value: Iterable<Feat>): boolean {
        return [...value].some(f => f === this.#feat);
    }
}

class CharacterFeatRequirement implements CharacterRequirements {
    readonly #feat: Feat;
    readonly #count: number;
    constructor(feat: Feat, count: number = 1) {
        this.#feat = feat;
        this.#count = count;
    }

    test(value: CharacterBaseInterface): boolean {
        Object.entries(value.baseProfile.feats).some(
            ([key, count]) => key === this.#feat && count >= this.#count,
        );
        return false;
    }
}

export { CharacterFeatRequirement, FeatRequirement };
