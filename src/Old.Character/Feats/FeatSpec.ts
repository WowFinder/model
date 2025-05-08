import { FeatFlag } from '@wowfinder/ts-enums';
import {
    type CharacterRequirements,
    type CharacterRequirementsPlaceholder,
    getCharacterEmptyRequirement,
} from '../Requirements/base';

type FeatBuilder = {
    label: string;
    requirements?: CharacterRequirements;
    flags?: Iterable<FeatFlag>;
};

class FeatSpec {
    readonly #label: string;
    readonly #requirements: CharacterRequirements;
    readonly #flags: Set<FeatFlag>;
    constructor({ label, requirements, flags }: FeatBuilder) {
        this.#label = `${label}`;
        this.#requirements = requirements ?? getCharacterEmptyRequirement();
        this.#flags = new Set<FeatFlag>(flags);
    }

    get label(): string {
        return this.#label;
    }

    get requirements(): CharacterRequirements {
        return this.#requirements;
    }

    get flags(): Set<FeatFlag> {
        return this.#flags;
    }

    testRequirements(char: CharacterRequirementsPlaceholder): boolean {
        return this.#requirements.test(char);
    }

    hasFlag(...flags: FeatFlag[]): boolean {
        return [...flags].every(f => this.#flags.has(f));
    }

    get multiple(): boolean {
        return this.#flags.has(FeatFlag.multiple);
    }
}

export type { FeatBuilder };
export { FeatSpec };
