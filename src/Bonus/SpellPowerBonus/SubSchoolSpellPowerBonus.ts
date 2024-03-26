import { SubSchool } from '@wowfinder/ts-enums';
import { JsonCompatible, JsonExportable, sum } from '@wowfinder/ts-utils';

type SubSchoolSpellPowerBonusBuilder = Partial<Record<SubSchool, number>>;

class SubSchoolSpellPowerBonus
    implements JsonExportable<SubSchoolSpellPowerBonusBuilder>
{
    #data: Record<SubSchool, number>;

    constructor(data: SubSchoolSpellPowerBonusBuilder) {
        const full: Partial<Record<SubSchool, number>> = {};
        for (const subSchool of Object.values(SubSchool)) {
            full[subSchool] = data[subSchool] ?? 0;
        }
        this.#data = full as Record<SubSchool, number>;
    }

    get raw(): Record<SubSchool, number> {
        return { ...this.#data };
    }

    get isZero(): boolean {
        return Object.values(this.#data).every(v => v === 0);
    }

    export(): JsonCompatible<SubSchoolSpellPowerBonusBuilder> {
        return this.raw;
    }

    static get zero(): SubSchoolSpellPowerBonus {
        return new SubSchoolSpellPowerBonus({});
    }

    static sum(...args: SubSchoolSpellPowerBonus[]): SubSchoolSpellPowerBonus {
        const result = this.zero;
        for (const subSchool of Object.values(SubSchool)) {
            result.#data[subSchool] = sum(...args.map(s => s.#data[subSchool]));
        }
        return result;
    }

    static max(...args: SubSchoolSpellPowerBonus[]): SubSchoolSpellPowerBonus {
        const result = this.zero;
        for (const subSchool of Object.values(SubSchool)) {
            result.#data[subSchool] = Math.max(
                ...args.map(s => s.#data[subSchool]),
            );
        }
        return result;
    }

    static multiply(
        bonus: SubSchoolSpellPowerBonus,
        factor: number,
    ): SubSchoolSpellPowerBonus {
        const result = this.zero;
        for (const subSchool of Object.values(SubSchool)) {
            result.#data[subSchool] = bonus.#data[subSchool] * factor;
        }
        return result;
    }
}

export type { SubSchoolSpellPowerBonusBuilder };
export { SubSchoolSpellPowerBonus };
