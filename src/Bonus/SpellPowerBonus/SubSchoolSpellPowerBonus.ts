import { SubSchool } from '@wowfinder/ts-enums';
import { JsonCompatible, JsonExportable, sum } from '@wowfinder/ts-utils';

type SubSchoolSpellPowerBonusBuilder = Partial<Record<SubSchool, number>>;

class SubSchoolSpellPowerBonus
    implements
        Record<SubSchool, number>,
        JsonExportable<SubSchoolSpellPowerBonusBuilder>
{
    #data: Record<SubSchool, number>;

    constructor(data: SubSchoolSpellPowerBonusBuilder) {
        const full: Partial<Record<SubSchool, number>> = {};
        for (const subSchool of Object.values(SubSchool)) {
            full[subSchool] = data[subSchool] ?? 0;
        }
        this.#data = full as Record<SubSchool, number>;
    }

    get void(): number {
        return this.#data.void;
    }

    get banish(): number {
        return this.#data.banish;
    }

    get counter(): number {
        return this.#data.counter;
    }

    get call(): number {
        return this.#data.call;
    }

    get celestial(): number {
        return this.#data.celestial;
    }

    get create(): number {
        return this.#data.create;
    }

    get heal(): number {
        return this.#data.heal;
    }

    get summon(): number {
        return this.#data.summon;
    }

    get teleport(): number {
        return this.#data.teleport;
    }

    get scry(): number {
        return this.#data.scry;
    }

    get charm(): number {
        return this.#data.charm;
    }

    get compel(): number {
        return this.#data.compel;
    }

    get figment(): number {
        return this.#data.figment;
    }

    get glamer(): number {
        return this.#data.glamer;
    }

    get phantom(): number {
        return this.#data.phantom;
    }

    get shadow(): number {
        return this.#data.shadow;
    }

    get enhancement(): number {
        return this.#data.enhancement;
    }

    get polymorph(): number {
        return this.#data.polymorph;
    }

    get isZero(): boolean {
        return Object.values(this.#data).every(v => v === 0);
    }

    export(): JsonCompatible<SubSchoolSpellPowerBonusBuilder> {
        return { ...this.#data };
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
