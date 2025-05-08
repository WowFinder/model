import { RawStats } from '@wowfinder/asset-schemas';
import { Stat } from '@wowfinder/ts-enums';
import { sum } from '@wowfinder/ts-utils';
import { zeroDefault } from '../../Creature/Stats';

export default class StatsBonus {
    #values: RawStats;

    constructor(values: Partial<RawStats>) {
        this.#values = { ...zeroDefault, ...values };
        for (const stat of Object.keys(Stat)) {
            Object.defineProperty(this, stat, {
                enumerable: true,
                configurable: false,
                get: () => this.#values[stat as Stat] || 0,
            });
        }
    }

    get values(): RawStats {
        return { ...this.#values };
    }

    get isZero(): boolean {
        return Object.values(this.#values).every(v => v === 0);
    }

    static get zero(): StatsBonus {
        return new StatsBonus(zeroDefault);
    }

    static sum(...args: StatsBonus[]): StatsBonus {
        const result = this.zero;
        for (const stat of Object.keys(Stat)) {
            result.#values[stat as Stat] = sum(
                ...args.map(s => s.#values[stat as Stat]),
            );
        }
        return result;
    }

    static max(...args: StatsBonus[]): StatsBonus {
        const result = this.zero;
        for (const stat of Object.keys(Stat)) {
            result.#values[stat as Stat] = Math.max(
                ...args.map(s => s.#values[stat as Stat]),
            );
        }
        return result;
    }

    static multiply(bonus: StatsBonus, factor: number): StatsBonus {
        const result = this.zero;
        for (const stat of Object.keys(Stat)) {
            result.#values[stat as Stat] = bonus.#values[stat as Stat] * factor;
        }
        return result;
    }

    static build(raw: any = {}): StatsBonus {
        const cured: any = {};
        for (const k of Object.keys(Stat)) {
            if (raw[k]) {
                cured[k] = raw[k] || 0;
            }
        }
        return new StatsBonus({ ...cured });
    }
}
