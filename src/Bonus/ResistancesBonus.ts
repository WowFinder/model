import { RawResistances } from '@wowfinder/asset-schemas';
import { DamageType } from '@wowfinder/ts-enums';
import { JsonCompatible, JsonExportable, sum } from '@wowfinder/ts-utils';

const rawZeroResistances: RawResistances = Object.keys(DamageType).reduce(
    (acc, key) => {
        acc[key as DamageType] = 0;
        return acc;
    },
    {} as RawResistances,
);

class ResistancesBonus
    implements RawResistances, JsonExportable<RawResistances>
{
    #raw: RawResistances;

    constructor(raw: Partial<RawResistances>) {
        this.#raw = { ...rawZeroResistances, ...raw };
    }

    get bludgeoning(): number {
        return this.#raw.bludgeoning;
    }

    get piercing(): number {
        return this.#raw.piercing;
    }

    get slashing(): number {
        return this.#raw.slashing;
    }

    get arcane(): number {
        return this.#raw.arcane;
    }

    get cold(): number {
        return this.#raw.cold;
    }

    get fire(): number {
        return this.#raw.fire;
    }

    get nature(): number {
        return this.#raw.nature;
    }

    get holy(): number {
        return this.#raw.holy;
    }

    get shadow(): number {
        return this.#raw.shadow;
    }

    get psychic(): number {
        return this.#raw.psychic;
    }

    get isZero(): boolean {
        return Object.values(this.#raw).every(v => v === 0);
    }

    export(): JsonCompatible<RawResistances> {
        return { ...this.#raw };
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
        const builder: Partial<RawResistances> = {};
        for (const strResistance of Object.keys(DamageType)) {
            const resistance = strResistance as DamageType;
            const mapped = args.map(s => s[resistance]).filter(s => !!s);
            builder[resistance] = Math.max(...mapped);
            if (builder[resistance] === Number.NEGATIVE_INFINITY) {
                delete builder[resistance];
            }
        }
        return new ResistancesBonus(builder);
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
