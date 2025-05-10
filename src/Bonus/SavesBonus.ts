import { type RawSaves } from '@wowfinder/asset-schemas';
import { type JsonExportable, sum } from '@wowfinder/ts-utils';

type SavesBonusBuilder = Partial<RawSaves>;

class SavesBonus implements RawSaves, JsonExportable<SavesBonusBuilder> {
    readonly #fortitude: number;
    readonly #reflexes: number;
    readonly #will: number;

    constructor(raw?: SavesBonusBuilder) {
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

    get isZero(): boolean {
        return (
            this.#fortitude === 0 && this.#reflexes === 0 && this.#will === 0
        );
    }

    export(): SavesBonusBuilder {
        return {
            fortitude: this.#fortitude,
            reflexes: this.#reflexes,
            will: this.#will,
        };
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
}

export { SavesBonus, type SavesBonusBuilder };
