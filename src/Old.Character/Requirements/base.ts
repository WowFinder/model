import { type CreatureProfile } from '../../Profile';

abstract class Requirement<T> {
    abstract test(value: T): boolean;
}

class FunctionBasedRequirement<T> implements Requirement<T> {
    readonly #fn: (value: T) => boolean;
    constructor(fn: (value: T) => boolean) {
        this.#fn = fn;
    }

    test(value: T): boolean {
        return this.#fn(value);
    }
}

class EmptyRequirement<T> implements Requirement<T> {
    test(): boolean {
        return true;
    }
}

function or<T>(...requirements: Requirement<T>[]): Requirement<T> {
    return new FunctionBasedRequirement<T>(value =>
        requirements.some(r => r.test(value)),
    );
}

function and<T>(...requirements: Requirement<T>[]): Requirement<T> {
    return new FunctionBasedRequirement<T>(value =>
        requirements.every(r => r.test(value)),
    );
}

/** TODO: Deprecate and remove (`CharacterRequirementsPlaceholder` and dependants) */

type CharacterRequirementsPlaceholder = {
    baseProfile: CreatureProfile;
    key: string;
};

type CharacterRequirements = Requirement<CharacterRequirementsPlaceholder>;

function getCharacterEmptyRequirement(): CharacterRequirements {
    return new EmptyRequirement<CharacterRequirementsPlaceholder>();
}

export {
    Requirement,
    FunctionBasedRequirement,
    EmptyRequirement,
    or,
    and,
    type CharacterRequirementsPlaceholder,
    type CharacterRequirements,
    getCharacterEmptyRequirement,
};
