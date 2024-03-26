interface VitalNeedsBonusBuilder {
    breathe?: boolean;
    eat?: boolean;
    sleep?: boolean;
}

class VitalNeedsBonus implements VitalNeedsBonusBuilder {
    // TODO: retype and implement arithmetics
    // ex: eat should be measured in rations/TimeUnit
    #breathe: boolean;
    #eat: boolean;
    #sleep: boolean;

    constructor({
        breathe = true,
        eat = true,
        sleep = true,
    }: VitalNeedsBonusBuilder) {
        this.#breathe = breathe;
        this.#eat = eat;
        this.#sleep = sleep;
    }

    get breathe(): boolean {
        return this.#breathe;
    }

    get eat(): boolean {
        return this.#eat;
    }

    get sleep(): boolean {
        return this.#sleep;
    }

    get isZero(): boolean {
        return this.#breathe && this.#eat && this.#sleep;
    }

    static get zero(): VitalNeedsBonus {
        return new VitalNeedsBonus({});
    }

    static combine(...args: VitalNeedsBonus[]): VitalNeedsBonus {
        return new VitalNeedsBonus({
            breathe: args.every(a => a.#breathe),
            eat: args.every(a => a.#eat),
            sleep: args.every(a => a.#sleep),
        });
    }

    static sum(...args: VitalNeedsBonus[]): VitalNeedsBonus {
        return this.combine(...args);
    }

    static max(...args: VitalNeedsBonus[]): VitalNeedsBonus {
        return this.combine(...args);
    }

    static multiply(bonus: VitalNeedsBonus, factor: number): VitalNeedsBonus {
        return factor === 0
            ? VitalNeedsBonus.zero
            : new VitalNeedsBonus({
                  breathe: bonus.#breathe,
                  eat: bonus.#eat,
                  sleep: bonus.#sleep,
              });
    }
}

export type { VitalNeedsBonusBuilder };
export { VitalNeedsBonus };
