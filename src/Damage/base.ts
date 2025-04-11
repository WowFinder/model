import {
    DamageTypes,
    FullDamageTypes,
    buildFullDamageTypes,
} from './DamageType';

type DamageComponentBaseBuilder = {
    types: DamageTypes;
};

abstract class DamageComponentBase {
    readonly #types: FullDamageTypes;
    constructor({ types }: DamageComponentBaseBuilder) {
        this.#types = buildFullDamageTypes(types);
    }

    get types(): FullDamageTypes {
        return { ...this.#types };
    }
}

export type { DamageComponentBaseBuilder };
export { DamageComponentBase };
