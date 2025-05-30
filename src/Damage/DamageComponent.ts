import { Stat } from '@wowfinder/ts-enums';
import { Dice } from '../Dice';
import { DamageModifier, computeModifier } from './DamageModifier';
import { DamageRollArguments } from './DamageRollArguments';
import { DamageComponentBaseBuilder, DamageComponentBase } from './base';

type DamageComponentValueBuilder = DamageComponentBaseBuilder & {
    total: number;
};

class DamageComponentValue
    extends DamageComponentBase
    implements DamageComponentValueBuilder
{
    readonly #total: number;
    constructor({ types, total }: DamageComponentValueBuilder) {
        super({ types });
        this.#total = total;
    }

    get total(): number {
        return this.#total;
    }

    multiply(multiplier: number): DamageComponentValue {
        return new DamageComponentValue({
            types: this.types,
            total: this.total * multiplier,
        });
    }
}

type DamageComponentSpecBuilder = DamageComponentBaseBuilder & {
    diceCount: number;
    diceSides: number;
    fixedMod?: number;
    modStat?: Stat;
};

class DamageComponentSpec
    extends DamageComponentBase
    implements DamageComponentSpecBuilder
{
    readonly #dice: Dice;
    readonly #mod?: DamageModifier;

    constructor({
        types,
        diceCount,
        diceSides,
        fixedMod = 0,
        modStat,
    }: DamageComponentSpecBuilder) {
        super({ types });
        this.#dice = new Dice({
            qtty: diceCount,
            sides: diceSides,
            fixedMod,
        });
        this.#mod = modStat;
    }

    get diceCount(): number {
        return this.#dice.qtty;
    }

    get diceSides(): number {
        return this.#dice.sides;
    }

    get fixedMod(): number {
        return this.#dice.fixedMod;
    }

    get mod(): DamageModifier | undefined {
        return this.#mod;
    }

    get dice(): Dice {
        return this.#dice;
    }

    roll(args: DamageRollArguments): DamageComponentValue {
        const mod = this.#mod ? computeModifier(this.#mod, args) : 0;
        return new DamageComponentValue({
            types: this.types,
            total: this.#dice.roll(mod),
        });
    }
}

export type { DamageComponentValueBuilder, DamageComponentSpecBuilder };

export { DamageComponentValue, DamageComponentSpec };
