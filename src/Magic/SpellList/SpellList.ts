import { RawSpellListAsset } from '@wowfinder/asset-schemas';
import { ForcedKeyResolver } from '@wowfinder/ts-utils';
import { Spell } from '../Spell/Spell';

type SpellListEntry = {
    spell: Spell;
    rank: number;
};

type SpellListLevel = SpellListEntry[];

type SpellListLevels = { [key: number]: SpellListLevel };

type SpellListConstructorArgs = RawSpellListAsset & {
    resolver: ForcedKeyResolver<Spell>;
};

class SpellList {
    readonly #key: string;
    readonly #core: boolean;
    readonly #spells: SpellListLevels;

    constructor({
        key,
        spells,
        core = false,
        resolver,
    }: SpellListConstructorArgs) {
        this.#key = key;
        this.#core = core;
        this.#spells = {};
        for (const [level, entries] of Object.entries(spells)) {
            const l = Number(level);
            if (isNaN(l)) {
                throw new Error(`Invalid spell list level: ${level}`);
            }
            this.#spells[l] = entries.map(entry => ({
                spell: resolver(entry.spell),
                rank: entry.rank,
            }));
        }
    }

    get key(): string {
        return this.#key;
    }

    get core(): boolean {
        return this.#core;
    }

    get spells(): SpellListLevels {
        const res: SpellListLevels = {};
        for (const [level, entries] of Object.entries(this.#spells)) {
            const l = Number(level);
            res[l] = [...entries];
        }
        return res;
    }
}

export { SpellList };
