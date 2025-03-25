import { RawStats } from '@wowfinder/asset-schemas';
import { addStatSets } from '../Creature';
import { JsonExportable, JsonCompatible } from '@wowfinder/ts-utils';
import { Stat } from '@wowfinder/ts-enums';

class StatsBonus implements RawStats, JsonExportable<RawStats> {
    readonly #strength: number;
    readonly #dexterity: number;
    readonly #constitution: number;
    readonly #intelligence: number;
    readonly #wisdom: number;
    readonly #charisma: number;

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

    export(): JsonCompatible<RawStats> {
        return {
            strength: this.#strength,
            dexterity: this.#dexterity,
            constitution: this.#constitution,
            intelligence: this.#intelligence,
            wisdom: this.#wisdom,
            charisma: this.#charisma,
        };
    }

    static get zero(): StatsBonus {
        return new StatsBonus({});
    }

    static sum(...args: StatsBonus[]): StatsBonus {
        return new StatsBonus({ ...addStatSets(...args) });
    }

    static max(...args: StatsBonus[]): StatsBonus {
        const builder = {
            strength: Math.max(...args.map(s => s.strength).filter(s => !!s)),
            dexterity: Math.max(...args.map(s => s.dexterity).filter(s => !!s)),
            constitution: Math.max(
                ...args.map(s => s.constitution).filter(s => !!s),
            ),
            intelligence: Math.max(
                ...args.map(s => s.intelligence).filter(s => !!s),
            ),
            wisdom: Math.max(...args.map(s => s.wisdom).filter(s => !!s)),
            charisma: Math.max(...args.map(s => s.charisma).filter(s => !!s)),
        } satisfies Partial<RawStats>;
        Object.keys(Stat)
            .filter(key => builder[key as Stat] === Number.NEGATIVE_INFINITY)
            .forEach(key => (builder[key as Stat] = 0));
        return new StatsBonus(builder);
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
