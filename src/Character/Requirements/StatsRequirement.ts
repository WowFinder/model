import { Requirement } from './base';
import { PartialStatSet, StatKeys, StatSet, zeroDefault } from '../Stats';
import { Character } from '..';
import { FunctionBasedRequirement } from '.';

class MinStatsRequirement implements StatSet, Requirement<StatSet> {
    #min: StatSet;
    constructor(min: PartialStatSet) {
        this.#min = Object.assign({}, zeroDefault, min);
    }

    get strength(): number {
        return this.#min.strength;
    }

    get dexterity(): number {
        return this.#min.dexterity;
    }

    get constitution(): number {
        return this.#min.constitution;
    }

    get intelligence(): number {
        return this.#min.intelligence;
    }

    get wisdom(): number {
        return this.#min.wisdom;
    }

    get charisma(): number {
        return this.#min.charisma;
    }

    test(value: PartialStatSet): boolean {
        return StatKeys.every(
            k => (value[k] || zeroDefault[k]) >= this.#min[k],
        );
    }
}
class MaxStatsRequirement implements StatSet, Requirement<StatSet> {
    #max: StatSet;
    constructor(max: PartialStatSet) {
        this.#max = Object.assign({}, zeroDefault, max);
    }

    get strength(): number {
        return this.#max.strength;
    }

    get dexterity(): number {
        return this.#max.dexterity;
    }

    get constitution(): number {
        return this.#max.constitution;
    }

    get intelligence(): number {
        return this.#max.intelligence;
    }

    get wisdom(): number {
        return this.#max.wisdom;
    }

    get charisma(): number {
        return this.#max.charisma;
    }

    test(value: PartialStatSet): boolean {
        const keys = Object.keys(this.#max);
        return StatKeys.every(
            k =>
                !keys.includes(k) ||
                (value[k] || zeroDefault[k]) <= this.#max[k],
        );
    }
}

function characterStatsRequirement<T extends Requirement<StatSet>>(
    req: T,
): Requirement<Character> {
    return new FunctionBasedRequirement<Character>((char: Character) =>
        req.test(char.stats.active),
    );
}

export { MinStatsRequirement, MaxStatsRequirement, characterStatsRequirement };
