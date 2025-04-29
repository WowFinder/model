import { ArmorValuesBuilder } from './builder';

class ArmorValues {
    readonly #gear: number;
    readonly #natural: number;
    readonly #deflection: number;
    readonly #misc: number;
    readonly #miscPhysical: number; // Misc bonus - Physical (not touch)
    readonly #miscEvasion: number; // Misc bonus - Evasion (not ff)
    readonly #temporary: number;
    readonly #temporaryPhysical: number; // Temp bonus - Physical (not touch)
    readonly #temporaryEvasion: number; // Temp bonus - Evasion (not ff)

    constructor({
        gear = 0,
        natural = 0,
        deflection = 0,
        misc = 0,
        miscPhysical = 0,
        miscEvasion = 0,
        temporary = 0,
        temporaryPhysical = 0,
        temporaryEvasion = 0,
    }: ArmorValuesBuilder) {
        this.#gear = gear;
        this.#natural = natural;
        this.#deflection = deflection;
        this.#misc = misc;
        this.#miscPhysical = miscPhysical;
        this.#miscEvasion = miscEvasion;
        this.#temporary = temporary;
        this.#temporaryPhysical = temporaryPhysical;
        this.#temporaryEvasion = temporaryEvasion;
    }

    get gear(): number {
        return this.#gear;
    }

    get natural(): number {
        return this.#natural;
    }

    get deflection(): number {
        return this.#deflection;
    }

    get misc(): number {
        return this.#misc;
    }

    get miscPhysical(): number {
        return this.#miscPhysical;
    }

    get miscEvasion(): number {
        return this.#miscEvasion;
    }

    get miscAll(): number {
        return this.misc + this.miscPhysical + this.miscEvasion;
    }

    get temporary(): number {
        return this.#temporary;
    }

    get temporaryPhysical(): number {
        return this.#temporaryPhysical;
    }

    get temporaryEvasion(): number {
        return this.#temporaryEvasion;
    }

    get temporaryAll(): number {
        return this.temporary + this.temporaryPhysical + this.temporaryEvasion;
    }

    export(): ArmorValuesBuilder {
        return {
            gear: this.gear,
            natural: this.natural,
            deflection: this.deflection,
            misc: this.misc,
            miscPhysical: this.miscPhysical,
            miscEvasion: this.miscEvasion,
            temporary: this.temporary,
            temporaryPhysical: this.temporaryPhysical,
            temporaryEvasion: this.temporaryEvasion,
        };
    }

    static get zero(): ArmorValues {
        return new ArmorValues({});
    }
}

export { ArmorValues };
