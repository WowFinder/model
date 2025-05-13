import { StringFormatter, sum, TryParser } from '@wowfinder/ts-utils';

function pluralize<T>(baseParser: TryParser<T>): TryParser<T> {
    return (input: string) =>
        baseParser(input) ?? baseParser(input.replace(/s$/, ''));
}

class Scalar<T> {
    readonly #value: number;
    readonly #unit: T;
    constructor({ value, unit }: { value: number; unit: T }) {
        this.#value = value;
        this.#unit = unit;
    }

    get value(): number {
        return this.#value;
    }

    get unit(): T {
        return this.#unit;
    }

    get isZero(): boolean {
        return this.#value === 0;
    }

    get negative(): Scalar<T> {
        return new Scalar({
            value: -this.#value,
            unit: this.#unit,
        });
    }

    toString(): string;

    toString(t: StringFormatter): string;

    toString(t?: StringFormatter): string {
        const unit = t ? t(`units.${this.#unit}`) : this.#unit;
        return `${this.#value} ${unit}`;
    }

    static tryParse<T>(
        input: string,
        unitParser: TryParser<T>,
    ): Scalar<T> | undefined {
        const match = /(\d+\.?\d*)\s*(.+)/.exec(input);
        if (!match) {
            return undefined;
        }
        const unit = pluralize(unitParser)(match[2]);
        if (!unit) {
            return undefined;
        }
        return new Scalar({
            value: +match[1],
            unit,
        });
    }
}

type converter<T> = (magnitude: Scalar<T>, to: T) => Scalar<T>;

function makeConverter<T extends string>(conversions: {
    [keys in T]: number;
}): converter<T> {
    return (magnitude: Scalar<T>, to: T): Scalar<T> => {
        return new Scalar({
            value:
                (magnitude.value * conversions[magnitude.unit]) /
                conversions[to],
            unit: to,
        });
    };
}

function add<T>(
    unit: T,
    convert: converter<T>,
    ...magnitudes: Scalar<T>[]
): Scalar<T> {
    return new Scalar({
        value: sum(...magnitudes.map(m => convert(m, unit).value)),
        unit,
    });
}

export { type converter, makeConverter, Scalar, add };
