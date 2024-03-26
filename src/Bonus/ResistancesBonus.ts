import { RawResistances } from '@wowfinder/asset-schemas';
import { DamageType } from '@wowfinder/ts-enums';
import { sum } from '@wowfinder/ts-utils';

const rawZeroResistances: RawResistances = Object.keys(DamageType).reduce(
    (acc, key) => {
        acc[key as DamageType] = 0;
        return acc;
    },
    {} as RawResistances,
);

class ResistancesBonus {
    #raw: RawResistances;

    constructor(raw: Partial<RawResistances>) {
        this.#raw = { ...rawZeroResistances, ...raw };
    }

    get raw(): RawResistances {
        return { ...this.#raw };
    }

    get isZero(): boolean {
        return Object.values(this.#raw).every(v => v === 0);
    }

    static get zero(): ResistancesBonus {
        return new ResistancesBonus({});
    }

    static sum(...args: ResistancesBonus[]): ResistancesBonus {
        const result = this.zero;
        for (const resistance of Object.keys(DamageType)) {
            result.#raw[resistance as DamageType] = sum(
                ...args.map(s => s.#raw[resistance as DamageType]),
            );
        }
        return result;
    }

    static max(...args: ResistancesBonus[]): ResistancesBonus {
        const result = this.zero;
        for (const resistance of Object.keys(DamageType)) {
            result.#raw[resistance as DamageType] = Math.max(
                ...args.map(s => s.#raw[resistance as DamageType]),
            );
        }
        return result;
    }

    static multiply(bonus: ResistancesBonus, factor: number): ResistancesBonus {
        const result = this.zero;
        for (const resistance of Object.keys(DamageType)) {
            result.#raw[resistance as DamageType] =
                bonus.#raw[resistance as DamageType] * factor;
        }
        return result;
    }
}

export { ResistancesBonus };
