interface SensesBonusBuilder {
    darkVision?: number;
    lowLightVision?: boolean;
    smell?: boolean;
}

class SensesBonus implements SensesBonusBuilder {
    #darkVision: number;
    #lowLightVision: boolean;
    #smell: boolean;

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

    static get defaults(): SensesBonus {
        return new SensesBonus({});
    }

    static #combine(...args: SensesBonus[]): SensesBonusBuilder {
        return {
            lowLightVision: args.some(s => s.#lowLightVision),
            smell: args.some(s => s.#smell),
        };
    }

    static sum(...args: SensesBonus[]): SensesBonus {
        return new SensesBonus({
            darkVision: args.reduce(
                (prev, curr): number => prev + curr.#darkVision,
                0,
            ),
            ...SensesBonus.#combine(...args),
        });
    }

    static max(...args: SensesBonus[]): SensesBonus {
        return new SensesBonus({
            darkVision: args.reduce(
                (prev, curr): number => Math.max(prev, curr.#darkVision),
                0,
            ),
            ...SensesBonus.#combine(...args),
        });
    }

    static multiply(bonus: SensesBonus, factor: number): SensesBonus {
        return new SensesBonus({
            darkVision: bonus.#darkVision * factor,
            lowLightVision: bonus.#lowLightVision,
            smell: bonus.#smell,
        });
    }
}

export type { SensesBonusBuilder };
export { SensesBonus };
