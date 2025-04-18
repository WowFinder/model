import { FeatFlag } from '@wowfinder/ts-enums';
import type { Character } from '..';
import { EmptyRequirement, Requirement } from '../Requirements';

type FeatBuilder = {
    label: string;
    requirements?: Requirement<Character>;
    flags?: Iterable<FeatFlag>;
};

class FeatSpec {
    readonly #label: string;
    readonly #requirements: Requirement<Character>;
    readonly #flags: Set<FeatFlag>;
    constructor({ label, requirements, flags }: FeatBuilder) {
        this.#label = `${label}`;
        this.#requirements = requirements ?? new EmptyRequirement<Character>();
        this.#flags = new Set<FeatFlag>(flags);
    }

    get label(): string {
        return this.#label;
    }

    get requirements(): Requirement<Character> {
        return this.#requirements;
    }

    get flags(): Set<FeatFlag> {
        return this.#flags;
    }

    testRequirements(char: Character): boolean {
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
