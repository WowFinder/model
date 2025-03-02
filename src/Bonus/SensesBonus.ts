import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';

interface SensesBonusBuilder {
    darkVision?: number;
    lowLightVision?: boolean;
    smell?: boolean;
}

class SensesBonus
    implements SensesBonusBuilder, JsonExportable<SensesBonusBuilder>
{
    readonly #darkVision: number;
    readonly #lowLightVision: boolean;
    readonly #smell: boolean;

    constructor({
        darkVision = 0,
        lowLightVision = false,
        smell = false,
    }: SensesBonusBuilder) {
        this.#darkVision = darkVision;
        this.#lowLightVision = lowLightVision;
        this.#smell = smell;
    }

    get darkVision(): number {
        return this.#darkVision;
    }

    get lowLightVision(): boolean {
        return this.#lowLightVision;
    }

    get smell(): boolean {
        return this.#smell;
    }

    get isZero(): boolean {
        return this.#darkVision === 0 && !this.#lowLightVision && !this.#smell;
    }

    export(): JsonCompatible<SensesBonusBuilder> {
        return {
            darkVision: this.#darkVision,
            lowLightVision: this.#lowLightVision,
            smell: this.#smell,
        };
    }

    static get defaults(): SensesBonus {
        return new SensesBonus({});
    }

    static max(...args: SensesBonus[]): SensesBonus {
        return new SensesBonus({
            darkVision: args.reduce(
                (prev, curr): number => Math.max(prev, curr.#darkVision),
                0,
            ),
            lowLightVision: args.some(s => s.#lowLightVision),
            smell: args.some(s => s.#smell),
        });
    }
}

export type { SensesBonusBuilder };
export { SensesBonus };
