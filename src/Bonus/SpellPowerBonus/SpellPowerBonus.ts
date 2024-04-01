import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';
import { CastingMode, School, SubSchool } from '@wowfinder/ts-enums';
import {
    ModeSpellPowerBonusBuilder,
    ModeSpellPowerBonus,
} from './ModeSpellPowerBonus';
import {
    SchoolSpellPowerBonusBuilder,
    SchoolSpellPowerBonus,
} from './SchoolSpellPowerBonus';
import {
    SubSchoolSpellPowerBonusBuilder,
    SubSchoolSpellPowerBonus,
} from './SubSchoolSpellPowerBonus';

type SpellPowerKeys = CastingMode | School | SubSchool;

const SpellPowerKeys: { [key in SpellPowerKeys]: SpellPowerKeys } = {
    ...CastingMode,
    ...School,
    ...SubSchool,
};

type SpellPowerBonusBuilder = ModeSpellPowerBonusBuilder &
    SchoolSpellPowerBonusBuilder &
    SubSchoolSpellPowerBonusBuilder;

class SpellPowerBonus implements JsonExportable<SpellPowerBonusBuilder> {
    #modes: ModeSpellPowerBonus;
    #schools: SchoolSpellPowerBonus;
    #subSchools: SubSchoolSpellPowerBonus;

    constructor(data: SpellPowerBonusBuilder) {
        this.#modes = new ModeSpellPowerBonus(data);
        this.#schools = new SchoolSpellPowerBonus(data);
        this.#subSchools = new SubSchoolSpellPowerBonus(data);
    }

    protected get modes(): ModeSpellPowerBonus {
        return this.#modes;
    }

    protected get schools(): SchoolSpellPowerBonus {
        return this.#schools;
    }

    protected get subSchools(): SubSchoolSpellPowerBonus {
        return this.#subSchools;
    }

    get isZero(): boolean {
        return (
            this.#modes.isZero &&
            this.#schools.isZero &&
            this.#subSchools.isZero
        );
    }

    mode(mode: CastingMode): number {
        return this.modes[mode];
    }

    school(school: School): number {
        return this.schools[school];
    }

    subSchool(subSchool: SubSchool): number {
        return this.subSchools[subSchool];
    }

    export(): JsonCompatible<SpellPowerBonusBuilder> {
        return {
            ...this.modes.export(),
            ...this.schools.export(),
            ...this.subSchools.export(),
        };
    }

    static get zero(): SpellPowerBonus {
        return new SpellPowerBonus({});
    }

    static sum(...args: SpellPowerBonus[]): SpellPowerBonus {
        const result = new (this as any)({});
        result.#modes = ModeSpellPowerBonus.sum(...args.map(s => s.#modes));
        result.#schools = SchoolSpellPowerBonus.sum(
            ...args.map(s => s.#schools),
        );
        result.#subSchools = SubSchoolSpellPowerBonus.sum(
            ...args.map(s => s.#subSchools),
        );
        return result;
    }

    static max(...args: SpellPowerBonus[]): SpellPowerBonus {
        const result = new (this as any)({});
        result.#modes = ModeSpellPowerBonus.max(...args.map(s => s.#modes));
        result.#schools = SchoolSpellPowerBonus.max(
            ...args.map(s => s.#schools),
        );
        result.#subSchools = SubSchoolSpellPowerBonus.max(
            ...args.map(s => s.#subSchools),
        );
        return result;
    }

    static multiply(bonus: SpellPowerBonus, factor: number): SpellPowerBonus {
        const result = new (this as any)({});
        result.#modes = ModeSpellPowerBonus.multiply(bonus.#modes, factor);
        result.#schools = SchoolSpellPowerBonus.multiply(
            bonus.#schools,
            factor,
        );
        result.#subSchools = SubSchoolSpellPowerBonus.multiply(
            bonus.#subSchools,
            factor,
        );
        return result;
    }
}

export type { SpellPowerBonusBuilder };
export { SpellPowerBonus, SpellPowerKeys };
