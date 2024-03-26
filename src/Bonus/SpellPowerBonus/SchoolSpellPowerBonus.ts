import { School } from '@wowfinder/ts-enums';
import { JsonCompatible, JsonExportable, sum } from '@wowfinder/ts-utils';

type SchoolSpellPowerBonusBuilder = Partial<Record<School, number>>;

class SchoolSpellPowerBonus
    implements JsonExportable<SchoolSpellPowerBonusBuilder>
{
    #data: Record<School, number>;

    constructor(data: SchoolSpellPowerBonusBuilder) {
        const full: Partial<Record<School, number>> = {};
        for (const school of Object.values(School)) {
            full[school] = data[school] ?? 0;
        }
        this.#data = full as Record<School, number>;
    }

    get raw(): Record<School, number> {
        return { ...this.#data };
    }

    get isZero(): boolean {
        return Object.values(this.#data).every(v => v === 0);
    }

    export(): JsonCompatible<SchoolSpellPowerBonusBuilder> {
        return this.raw;
    }

    static get zero(): SchoolSpellPowerBonus {
        return new SchoolSpellPowerBonus({});
    }

    static sum(...args: SchoolSpellPowerBonus[]): SchoolSpellPowerBonus {
        const result = this.zero;
        for (const school of Object.values(School)) {
            result.#data[school] = sum(...args.map(s => s.#data[school]));
        }
        return result;
    }

    static max(...args: SchoolSpellPowerBonus[]): SchoolSpellPowerBonus {
        const result = this.zero;
        for (const school of Object.values(School)) {
            result.#data[school] = Math.max(...args.map(s => s.#data[school]));
        }
        return result;
    }

    static multiply(
        bonus: SchoolSpellPowerBonus,
        factor: number,
    ): SchoolSpellPowerBonus {
        const result = this.zero;
        for (const school of Object.values(School)) {
            result.#data[school] = bonus.#data[school] * factor;
        }
        return result;
    }
}

export type { SchoolSpellPowerBonusBuilder };
export { SchoolSpellPowerBonus };
