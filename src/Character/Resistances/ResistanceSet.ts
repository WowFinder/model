import { DamageType } from '@wowfinder/ts-enums';

type ResistancePartialSet = { [key in DamageType]?: number };

type ResistanceSet = { [key in DamageType]: number };

class ResistanceSetImpl implements ResistanceSet {
    readonly #data: ResistanceSet;

    constructor(source: ResistancePartialSet) {
        const curated: ResistancePartialSet = {};
        for (const t of Object.keys(DamageType)) {
            curated[t as DamageType] = source[t as DamageType] ?? 0;
        }
        this.#data = curated as ResistanceSet;
    }

    get bludgeoning(): number {
        return this.#data.bludgeoning;
    }

    get slashing(): number {
        return this.#data.slashing;
    }

    get piercing(): number {
        return this.#data.piercing;
    }

    get arcane(): number {
        return this.#data.arcane;
    }

    get fire(): number {
        return this.#data.fire;
    }

    get cold(): number {
        return this.#data.cold;
    }

    get nature(): number {
        return this.#data.nature;
    }

    get shadow(): number {
        return this.#data.shadow;
    }

    get holy(): number {
        return this.#data.holy;
    }

    get psychic(): number {
        return this.#data.psychic;
    }
}

export type { ResistancePartialSet, ResistanceSet };
export { ResistanceSetImpl };
