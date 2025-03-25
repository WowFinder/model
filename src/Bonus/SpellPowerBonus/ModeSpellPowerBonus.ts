import { JsonCompatible, JsonExportable, sum } from '@wowfinder/ts-utils';
interface ModeSpellPowerBonusBuilder {
    arcane?: number;
    divine?: number;
    spontaneous?: number;
}

class ModeSpellPowerBonus
    implements JsonExportable<ModeSpellPowerBonusBuilder>
{
    readonly #arcane: number;
    readonly #divine: number;
    readonly #spontaneous: number;

    constructor({
        arcane = 0,
        divine = 0,
        spontaneous = 0,
    }: ModeSpellPowerBonusBuilder) {
        this.#arcane = arcane;
        this.#divine = divine;
        this.#spontaneous = spontaneous;
    }

    get arcane(): number {
        return this.#arcane;
    }

    get divine(): number {
        return this.#divine;
    }

    get spontaneous(): number {
        return this.#spontaneous;
    }

    get isZero(): boolean {
        return (
            this.#arcane === 0 && this.#divine === 0 && this.#spontaneous === 0
        );
    }

    export(): JsonCompatible<ModeSpellPowerBonusBuilder> {
        return {
            arcane: this.#arcane,
            divine: this.#divine,
            spontaneous: this.#spontaneous,
        };
    }

    static get zero(): ModeSpellPowerBonus {
        return new ModeSpellPowerBonus({});
    }

    static sum(...args: ModeSpellPowerBonus[]): ModeSpellPowerBonus {
        return new ModeSpellPowerBonus({
            arcane: sum(...args.map(s => s.#arcane)),
            divine: sum(...args.map(s => s.#divine)),
            spontaneous: sum(...args.map(s => s.#spontaneous)),
        });
    }

    static max(...args: ModeSpellPowerBonus[]): ModeSpellPowerBonus {
        return new ModeSpellPowerBonus({
            arcane: Math.max(...args.map(s => s.#arcane)),
            divine: Math.max(...args.map(s => s.#divine)),
            spontaneous: Math.max(...args.map(s => s.#spontaneous)),
        });
    }

    static multiply(
        bonus: ModeSpellPowerBonus,
        factor: number,
    ): ModeSpellPowerBonus {
        return new ModeSpellPowerBonus({
            arcane: bonus.#arcane * factor,
            divine: bonus.#divine * factor,
            spontaneous: bonus.#spontaneous * factor,
        });
    }
}

export type { ModeSpellPowerBonusBuilder };
export { ModeSpellPowerBonus };
