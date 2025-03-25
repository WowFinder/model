import { JsonExportable } from '@wowfinder/ts-utils';

interface VitalNeedsBonusBuilder {
    breathe?: boolean;
    eat?: boolean;
    sleep?: boolean;
}

class VitalNeedsBonus
    implements VitalNeedsBonusBuilder, JsonExportable<VitalNeedsBonusBuilder>
{
    // TODO: retype and implement arithmetics
    // ex: eat should be measured in rations/TimeUnit
    readonly #breathe: boolean;
    readonly #eat: boolean;
    readonly #sleep: boolean;

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

    export(): VitalNeedsBonusBuilder {
        return {
            breathe: this.#breathe,
            eat: this.#eat,
            sleep: this.#sleep,
        };
    }

    static get zero(): VitalNeedsBonus {
        return new VitalNeedsBonus({});
    }

    static max(...args: VitalNeedsBonus[]): VitalNeedsBonus {
        return new VitalNeedsBonus({
            breathe: args.every(a => a.#breathe),
            eat: args.every(a => a.#eat),
            sleep: args.every(a => a.#sleep),
        });
    }
}

export type { VitalNeedsBonusBuilder };
export { VitalNeedsBonus };
