type MoneyBreakdown = {
    _: number;
    c: number;
    s: number;
    g: number;
};

type CoinType = 'c' | 's' | 'g';

const displayCoinTypes: CoinType[] = ['g', 's', 'c'];

const ratio = 100;
const ratios: MoneyBreakdown = {
    _: 0,
    c: ratio ** 0,
    s: ratio ** 1,
    g: ratio ** 2,
};

function asRaw(value: Money | MoneyBreakdown | number): number {
    if (value instanceof Money) {
        return value.raw;
    } else if (typeof value === 'number') {
        return value;
    } else {
        return Money.condense(value);
    }
}

class Money {
    readonly #raw: number;
    static explode(raw: number): MoneyBreakdown {
        const g = Math.floor(raw / ratios.g);
        raw %= ratios.g;
        const s = Math.floor(raw / ratios.s);
        raw %= ratios.s;
        const c = Math.floor(raw / ratios.c);
        raw %= ratios.c;
        return {
            _: raw,
            c,
            s,
            g,
        };
    }

    static condense({ _ = 0, c = 0, s = 0, g = 0 }: MoneyBreakdown): number {
        return _ + c * ratios.c + s * ratios.s + g * ratios.g;
    }

    private constructor(raw: number) {
        this.#raw = raw;
    }

    static fromRaw(raw: number): Money {
        return new Money(raw);
    }

    static fromBreakdown(breakdown: MoneyBreakdown): Money {
        return new Money(Money.condense(breakdown));
    }

    static fromMoney(money: Money): Money {
        return new Money(money.raw);
    }

    static get zero(): Money {
        return new Money(0);
    }

    add(value: Money | MoneyBreakdown | number): Money {
        return new Money(this.#raw + asRaw(value));
    }

    subtract(value: Money | MoneyBreakdown | number): Money {
        return new Money(this.#raw - asRaw(value));
    }

    get raw(): number {
        return this.#raw;
    }

    get split(): MoneyBreakdown {
        return Money.explode(this.#raw);
    }

    toString(): string {
        const breakdown = this.split;
        return displayCoinTypes.map(t => `${breakdown[t]}${t}`).join();
    }
}

function asMoney(value: Money | number): Money {
    return value instanceof Money ? value : Money.fromRaw(value || 0);
}

export type { CoinType };
export { Money, type MoneyBreakdown, displayCoinTypes, asMoney };
