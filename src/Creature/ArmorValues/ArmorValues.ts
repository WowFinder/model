import { ArmorValuesBuilder } from './builder';

class ArmorValues {
    #armor: number;
    #shield: number;
    #dodge: number;
    #natural: number;
    #deflection: number;
    #misc: number;
    #miscPhysical: number; // Misc bonus - Physical (not touch)
    #miscEvasion: number; // Misc bonus - Evasion (not ff)
    #temporary: number;
    #temporaryPhysical: number; // Temp bonus - Physical (not touch)
    #temporaryEvasion: number; // Temp bonus - Evasion (not ff)

    constructor({
        armor = 0,
        shield = 0,
        dodge = 0,
        natural = 0,
        deflection = 0,
        misc = 0,
        miscPhysical = 0,
        miscEvasion = 0,
        temporary = 0,
        temporaryPhysical = 0,
        temporaryEvasion = 0,
    }: ArmorValuesBuilder) {
        this.#armor = armor;
        this.#shield = shield;
        this.#dodge = dodge;
        this.#natural = natural;
        this.#deflection = deflection;
        this.#misc = misc;
        this.#miscPhysical = miscPhysical;
        this.#miscEvasion = miscEvasion;
        this.#temporary = temporary;
        this.#temporaryPhysical = temporaryPhysical;
        this.#temporaryEvasion = temporaryEvasion;
    }

    get armor(): number {
        return this.#armor;
    }

    get shield(): number {
        return this.#shield;
    }

    get dodge(): number {
        return this.#dodge;
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
            armor: this.armor,
            shield: this.shield,
            dodge: this.dodge,
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
