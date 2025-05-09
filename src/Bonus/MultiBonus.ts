import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';
import { TypedSimpleBonus } from './TypedSimpleBonus';
import { BonusType } from '@wowfinder/ts-enums';
import { maxBonus, sumBonus } from './SimpleBonus.helpers';
import { SimpleBonus, type SimpleBonusBuilder } from './SimpleBonus';

type MultiBonusBuilder = { [key in BonusType]?: SimpleBonusBuilder };
type FullMultiBonus = Record<BonusType, TypedSimpleBonus>;

const stackableBonusTypes: { [key in BonusType]: boolean } = {
    [BonusType.gear]: true,
    [BonusType.enhancement]: false,
    [BonusType.deflection]: true,
    [BonusType.natural]: false,
    [BonusType.temporal]: true,
    [BonusType.aura]: false,
} as const;

class MultiBonus implements FullMultiBonus, JsonExportable<MultiBonusBuilder> {
    readonly #gear: TypedSimpleBonus;
    readonly #enhancement: TypedSimpleBonus;
    readonly #deflection: TypedSimpleBonus;
    readonly #natural: TypedSimpleBonus;
    readonly #temporal: TypedSimpleBonus;
    readonly #aura: TypedSimpleBonus;

    constructor({
        gear = {},
        enhancement = {},
        deflection = {},
        natural = {},
        temporal = {},
        aura = {},
    }: MultiBonusBuilder = {}) {
        this.#gear = new TypedSimpleBonus({
            ...gear,
            type: BonusType.gear,
        });
        this.#enhancement = new TypedSimpleBonus({
            ...enhancement,
            type: BonusType.enhancement,
        });
        this.#deflection = new TypedSimpleBonus({
            ...deflection,
            type: BonusType.deflection,
        });
        this.#natural = new TypedSimpleBonus({
            ...natural,
            type: BonusType.natural,
        });
        this.#temporal = new TypedSimpleBonus({
            ...temporal,
            type: BonusType.temporal,
        });
        this.#aura = new TypedSimpleBonus({
            ...aura,
            type: BonusType.aura,
        });
    }

    get gear(): TypedSimpleBonus {
        return this.#gear;
    }

    get enhancement(): TypedSimpleBonus {
        return this.#enhancement;
    }

    get deflection(): TypedSimpleBonus {
        return this.#deflection;
    }

    get natural(): TypedSimpleBonus {
        return this.#natural;
    }

    get temporal(): TypedSimpleBonus {
        return this.#temporal;
    }

    get aura(): TypedSimpleBonus {
        return this.#aura;
    }

    get total(): SimpleBonus {
        return new SimpleBonus(
            sumBonus(
                this.#gear,
                this.#enhancement,
                this.#deflection,
                this.#natural,
                this.#temporal,
                this.#aura,
            ),
        );
    }

    export(): JsonCompatible<MultiBonusBuilder> {
        const obj: MultiBonusBuilder = {};
        Object.keys(BonusType).forEach(type => {
            if (this[type as BonusType]) {
                obj[type as BonusType] = this[type as BonusType].export();
            }
        });
        return obj;
    }

    static combine(...bonuses: MultiBonus[]): MultiBonus {
        const builder: MultiBonusBuilder = {};
        Object.keys(BonusType).forEach(strType => {
            const type = strType as BonusType;
            const mapped = bonuses.map(b => b[type]).filter(b => !!b);
            if (stackableBonusTypes[type]) {
                builder[type] = sumBonus(...mapped);
            } else {
                builder[type] = maxBonus(...mapped);
            }
        });
        return new MultiBonus(builder);
    }
}

export type { MultiBonusBuilder };
export { MultiBonus, stackableBonusTypes };
