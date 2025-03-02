import { RawSaves } from '@wowfinder/asset-schemas';
import { sum } from '@wowfinder/ts-utils';

export default class SavesBonus implements RawSaves {
    readonly #fortitude: number;
    readonly #reflexes: number;
    readonly #will: number;

    constructor(raw?: Partial<RawSaves>) {
        this.#fortitude = raw?.fortitude ?? 0;
        this.#reflexes = raw?.reflexes ?? 0;
        this.#will = raw?.will ?? 0;
    }

    get fortitude(): number {
        return this.#fortitude;
    }

    get reflexes(): number {
        return this.#reflexes;
    }

    get will(): number {
        return this.#will;
    }

    static get zero(): SavesBonus {
        return new SavesBonus({});
    }

    static sum(...args: SavesBonus[]): SavesBonus {
        return new SavesBonus({
            fortitude: sum(...args.map(a => a.#fortitude)),
            reflexes: sum(...args.map(a => a.#reflexes)),
            will: sum(...args.map(a => a.#will)),
        });
    }

    static max(...args: SavesBonus[]): SavesBonus {
        return new SavesBonus({
            fortitude: Math.max(...args.map(a => a.fortitude)),
            reflexes: Math.max(...args.map(a => a.reflexes)),
            will: Math.max(...args.map(a => a.will)),
        });
    }

    /** @deprecated */
    static build(raw: any = {}): SavesBonus {
        return new SavesBonus({
            fortitude: raw.fortitude ?? 0,
            reflexes: raw.reflexes ?? 0,
            will: raw.will ?? 0,
        });
    }
}
