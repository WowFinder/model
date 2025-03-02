import { JsonCompatible, JsonExportable, sum } from '@wowfinder/ts-utils';
import { SpeedsModifiers } from './helpers';

type SpeedsModifiersBonusBuilder = Partial<SpeedsModifiers>;

class SpeedsModifiersBonus
    implements SpeedsModifiers, JsonExportable<SpeedsModifiers>
{
    readonly #base: number;
    readonly #burrow: number;
    readonly #climb: number;
    readonly #swim: number;
    readonly #fly: number;

    constructor({
        base = 0,
        burrow = 0,
        climb = 0,
        swim = 0,
        fly = 0,
    }: SpeedsModifiersBonusBuilder) {
        this.#base = base;
        this.#burrow = burrow;
        this.#climb = climb;
        this.#swim = swim;
        this.#fly = fly;
    }

    get base(): number {
        return this.#base;
    }

    get burrow(): number {
        return this.#burrow;
    }

    get climb(): number {
        return this.#climb;
    }

    get swim(): number {
        return this.#swim;
    }

    get fly(): number {
        return this.#fly;
    }

    get isZero(): boolean {
        return (
            !this.#base &&
            !this.#burrow &&
            !this.#climb &&
            !this.#swim &&
            !this.#fly
        );
    }

    export(): JsonCompatible<SpeedsModifiers> {
        return {
            base: this.#base,
            burrow: this.#burrow,
            climb: this.#climb,
            swim: this.#swim,
            fly: this.#fly,
        };
    }

    static get zero(): SpeedsModifiersBonus {
        return new SpeedsModifiersBonus({
            base: 0,
        });
    }

    static sum(...bonuses: SpeedsModifiersBonus[]): SpeedsModifiersBonus {
        return new SpeedsModifiersBonus({
            base: sum(...bonuses.map(bonus => bonus.base)),
            burrow: sum(...bonuses.map(bonus => bonus.burrow)),
            climb: sum(...bonuses.map(bonus => bonus.climb)),
            swim: sum(...bonuses.map(bonus => bonus.swim)),
            fly: sum(...bonuses.map(bonus => bonus.fly)),
        });
    }

    static max(...bonuses: SpeedsModifiersBonus[]): SpeedsModifiersBonus {
        return new SpeedsModifiersBonus({
            base: Math.max(...bonuses.map(bonus => bonus.base)),
            burrow: Math.max(...bonuses.map(bonus => bonus.burrow)),
            climb: Math.max(...bonuses.map(bonus => bonus.climb)),
            swim: Math.max(...bonuses.map(bonus => bonus.swim)),
            fly: Math.max(...bonuses.map(bonus => bonus.fly)),
        });
    }

    static multiply(
        bonus: SpeedsModifiersBonus,
        factor: number,
    ): SpeedsModifiersBonus {
        return new SpeedsModifiersBonus({
            base: bonus.base * factor,
            burrow: bonus.burrow * factor,
            climb: bonus.climb * factor,
            swim: bonus.swim * factor,
            fly: bonus.fly * factor,
        });
    }
}

export type { SpeedsModifiersBonusBuilder };
export { SpeedsModifiersBonus };
