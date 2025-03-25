import { sum } from '@wowfinder/ts-utils';
import {
    DamageType,
    EnergyType,
    PhysicalDamageType,
    SpecialDamageType,
} from '@wowfinder/ts-enums';
import type { ResistancePartialSet, ResistanceSet } from '../Resistances';

function fillPhysical(
    data: ResistancePartialSet,
    filler = 0,
): Record<PhysicalDamageType, number> {
    return {
        bludgeoning: data.bludgeoning ?? filler,
        slashing: data.slashing ?? filler,
        piercing: data.piercing ?? filler,
    };
}

function fillEnergy(
    data: ResistancePartialSet,
    filler = 0,
): Record<EnergyType, number> {
    return {
        arcane: data.arcane ?? filler,
        fire: data.fire ?? filler,
        cold: data.cold ?? filler,
        nature: data.nature ?? filler,
        shadow: data.shadow ?? filler,
        holy: data.holy ?? filler,
    };
}

function fillSpecial(
    data: ResistancePartialSet,
    filler = 0,
): Record<SpecialDamageType, number> {
    return {
        psychic: data.psychic ?? filler,
    };
}

function fill(data: ResistancePartialSet, filler = 0): ResistanceSet {
    return {
        ...fillPhysical(data, filler),
        ...fillEnergy(data, filler),
        ...fillSpecial(data, filler),
    };
}

export default class ResistBonus {
    #values: ResistanceSet;

    constructor(data: ResistancePartialSet) {
        this.#values = fill(data);
    }

    get values(): ResistanceSet {
        return { ...this.#values };
    }

    get isZero(): boolean {
        return Object.values(this.#values).every(v => v === 0);
    }

    static get zero(): ResistBonus {
        return new ResistBonus({});
    }

    static sum(...args: ResistBonus[]): ResistBonus {
        const result = this.zero;
        for (const type of Object.keys(DamageType)) {
            result.#values[type as DamageType] = sum(
                ...args.map(r => r.#values[type as DamageType]),
            );
        }
        return result;
    }

    static multiply(bonus: ResistBonus, factor: number): ResistBonus {
        const result = this.zero;
        for (const type of Object.keys(DamageType)) {
            result.#values[type as DamageType] =
                bonus.#values[type as DamageType] * factor;
        }
        return result;
    }

    static max(...args: ResistBonus[]): ResistBonus {
        const result = this.zero;
        for (const type of Object.keys(DamageType)) {
            result.#values[type as DamageType] = Math.max(
                ...args.map(r => r.#values[type as DamageType]),
            );
        }
        return result;
    }

    static build(raw: any = {}): ResistBonus {
        return new ResistBonus({ ...this.zero.#values, ...raw });
    }
}

export { fill as fillResistBonus };
