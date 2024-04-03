import { RawStats } from '@wowfinder/asset-schemas';
import { Stat } from '@wowfinder/ts-enums';
import { zeroDefault } from 'Creature/Stats';
import { FunctionBasedRequirement } from '.';
import type { Character } from 'Character';
import { Requirement } from './base';

class MinStatsRequirement implements RawStats, Requirement<RawStats> {
    #min: RawStats;
    constructor(min: Partial<RawStats>) {
        this.#min = { ...zeroDefault, ...min };
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

    test(value: Partial<RawStats>): boolean {
        return Object.keys(Stat)
            .map(k => k as keyof RawStats)
            .every(k => (value[k] ?? zeroDefault[k]) >= this.#min[k]);
    }
}
class MaxStatsRequirement implements RawStats, Requirement<RawStats> {
    #max: RawStats;
    constructor(max: Partial<RawStats>) {
        this.#max = { ...zeroDefault, ...max };
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

    test(value: Partial<RawStats>): boolean {
        const keys = Object.keys(this.#max);
        return Object.keys(Stat)
            .map(k => k as keyof RawStats)
            .every(
                k =>
                    !keys.includes(k) ||
                    (value[k] ?? zeroDefault[k]) <= this.#max[k],
            );
    }
}

function characterStatsRequirement<T extends Requirement<RawStats>>(
    req: T,
): Requirement<Character> {
    return new FunctionBasedRequirement<Character>((char: Character) =>
        req.test(char.stats.active),
    );
}

export { MaxStatsRequirement, MinStatsRequirement, characterStatsRequirement };
