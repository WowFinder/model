import { sum } from '@wowfinder/ts-utils';
import type { Character } from '../';
import type { Requirement } from './base';

abstract class LevelRequirementBase implements Requirement<Character> {
    readonly #level: number;
    constructor(level: number) {
        this.#level = level;
    }

    get level(): number {
        return this.#level;
    }

    abstract test(value: Character): boolean;
}

class CharacterLevelRequirement extends LevelRequirementBase {
    test(value: Character): boolean {
        return sum(...value.classes.map(entry => entry.level)) >= this.level;
    }
}

class CasterLevelRequirement extends LevelRequirementBase {
    test(value: Character): boolean {
        const efl = value.classBonuses.efl;
        return efl.arcane + efl.divine + efl.spontaneous >= this.level;
    }
}

class AttackBonusRequirement extends LevelRequirementBase {
    test(value: Character): boolean {
        return value.classBonuses.bab >= this.level;
    }
}

export {
    AttackBonusRequirement,
    CasterLevelRequirement,
    CharacterLevelRequirement,
};
