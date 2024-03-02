// import { forceDataLoadKeyS } from 'ts-utils';
import type { SpellListBuilder, SpellListLevels } from './helpers';
import { buildSpellListLevel } from './builders';

type SpellLists = { [key: string]: SpellList };

class SpellList implements SpellListBuilder {
    #key: string;
    #spells: SpellListLevels;

    constructor({ key, spells }: SpellListBuilder) {
        this.#key = key;
        this.#spells = Object.fromEntries(
            Object.entries(spells).map(([level, entries]) => [
                level,
                buildSpellListLevel(entries),
            ]),
        );
    }

    get key(): string {
        return this.#key;
    }

    get spells(): SpellListLevels {
        const res: SpellListLevels = {};
        for (const [level, entries] of Object.entries(this.#spells)) {
            const l = Number(level);
            if (isNaN(l)) {
                throw new Error(`Invalid spell list level: ${level}`);
            }
            res[l] = [...entries];
        }
        return res;
    }

    static build(raw: any): SpellList {
        return new SpellList(raw);
    }

    // static #loaded: SpellLists | null = null;

    static load(/* reThrowErrors = false */): SpellLists {
        throw new Error('Not implemented');
        /* return (this.#loaded ||= forceDataLoadKeyS<SpellList>(
            window.Main.asset('SpellLists'),
            this.build,
            reThrowErrors,
        )); */
    }
}

export type { SpellLists };
export { SpellList };
