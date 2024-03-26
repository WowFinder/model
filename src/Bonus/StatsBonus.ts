import { RawStats } from '@wowfinder/asset-schemas';
import { addStatSets } from '../Creature';

class StatsBonus implements RawStats {
    #strength: number;
    #dexterity: number;
    #constitution: number;
    #intelligence: number;
    #wisdom: number;
    #charisma: number;

    constructor(values: Partial<RawStats>) {
        this.#strength = values.strength ?? 0;
        this.#dexterity = values.dexterity ?? 0;
        this.#constitution = values.constitution ?? 0;
        this.#intelligence = values.intelligence ?? 0;
        this.#wisdom = values.wisdom ?? 0;
        this.#charisma = values.charisma ?? 0;
    }

    get strength(): number {
        return this.#strength;
    }

    get dexterity(): number {
        return this.#dexterity;
    }

    get constitution(): number {
        return this.#constitution;
    }

    get intelligence(): number {
        return this.#intelligence;
    }

    get wisdom(): number {
        return this.#wisdom;
    }

    get charisma(): number {
        return this.#charisma;
    }

    get isZero(): boolean {
        return (
            this.#strength === 0 &&
            this.#dexterity === 0 &&
            this.#constitution === 0 &&
            this.#intelligence === 0 &&
            this.#wisdom === 0 &&
            this.#charisma === 0
        );
    }

    static get zero(): StatsBonus {
        return new StatsBonus({});
    }

    static sum(...args: StatsBonus[]): StatsBonus {
        return new StatsBonus({ ...addStatSets(...args) });
    }

    static max(...args: StatsBonus[]): StatsBonus {
        return new StatsBonus({
            strength: Math.max(...args.map(s => s.strength)),
            dexterity: Math.max(...args.map(s => s.dexterity)),
            constitution: Math.max(...args.map(s => s.constitution)),
            intelligence: Math.max(...args.map(s => s.intelligence)),
            wisdom: Math.max(...args.map(s => s.wisdom)),
            charisma: Math.max(...args.map(s => s.charisma)),
        });
    }

    static multiply(bonus: StatsBonus, factor: number): StatsBonus {
        return new StatsBonus({
            strength: bonus.strength * factor,
            dexterity: bonus.dexterity * factor,
            constitution: bonus.constitution * factor,
            intelligence: bonus.intelligence * factor,
            wisdom: bonus.wisdom * factor,
            charisma: bonus.charisma * factor,
        });
    }
}

export { StatsBonus };
