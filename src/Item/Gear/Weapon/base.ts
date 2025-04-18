import {
    WeaponFlags,
    WeaponGroup,
    WeaponProficiency,
    WeaponRank,
} from '@wowfinder/ts-enums';
import { DamageSpec } from '../../../Damage';
import { Length } from '../../../Scalar';
import { Gear } from '../base';
import { WeaponBuilder, buildWeaponDamage } from './builder';
import { asFeet } from './helpers';

abstract class WeaponBase extends Gear {
    readonly #damage: DamageSpec;
    readonly #intrinsic: number;
    readonly #groups: Set<WeaponGroup>;
    readonly #rank: WeaponRank;
    readonly #proficiency: WeaponProficiency;
    readonly #flags: Set<WeaponFlags>;
    readonly #critRange: number;
    readonly #critMult: number;
    readonly #range: Length;

    constructor({
        damage,
        intrinsic = 0,
        groups,
        rank,
        proficiency,
        flags = new Set(),
        criticalRange = 20,
        criticalMultiplier = 2,
        range = 0,
        ...args
    }: WeaponBuilder) {
        super(args);
        this.#damage = buildWeaponDamage(...damage);
        this.#intrinsic = intrinsic;
        this.#groups = new Set(groups);
        this.#rank = rank;
        this.#proficiency = proficiency;
        this.#flags = new Set(flags);
        this.#critRange = criticalRange;
        this.#critMult = criticalMultiplier;
        this.#range = asFeet(range);
    }

    get intrinsic(): number {
        return this.#intrinsic;
    }

    get damage(): DamageSpec {
        return this.#damage;
    }

    get groups(): Set<WeaponGroup> {
        return new Set(this.#groups);
    }

    get rank(): WeaponRank {
        return this.#rank;
    }

    get proficiency(): WeaponProficiency {
        return this.#proficiency;
    }

    get flags(): Set<WeaponFlags> {
        return new Set(this.#flags);
    }

    get criticalRange(): number {
        return this.#critRange;
    }

    get criticalMultiplier(): number {
        return this.#critMult;
    }

    get range(): Length {
        return this.#range;
    }
}

export { WeaponBase };
