type VitalNeedsBuilder = {
    breathe?: boolean;
    eat?: boolean;
    sleep?: boolean;
};
class VitalNeeds {
    readonly #breathe: boolean;
    readonly #eat: boolean;
    readonly #sleep: boolean;

    constructor({
        breathe = true,
        eat = true,
        sleep = true,
    }: VitalNeedsBuilder) {
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

    static get zero(): VitalNeeds {
        return new VitalNeeds({});
    }

    static combine(...args: VitalNeeds[]): VitalNeeds {
        return new VitalNeeds({
            breathe: args.every(a => a.#breathe),
            eat: args.every(a => a.#eat),
            sleep: args.every(a => a.#sleep),
        });
    }

    static build(raw: any = {}): VitalNeeds {
        return new VitalNeeds({
            ...raw,
            breathe: true,
            eat: true,
            sleep: true,
        });
    }
}

export { VitalNeeds };
