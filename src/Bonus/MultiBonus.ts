import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';
import { SimpleBonus } from './SimpleBonus';
import { SimpleBonusBuilder } from './SimpleBonus.builder';
import { BonusType } from '@wowfinder/ts-enums';
import { maxBonus, sumBonus } from './SimpleBonus.helpers';

type MultiBonusBuilder = { [key in BonusType]?: SimpleBonusBuilder };
type FullMultiBonus = Record<BonusType, SimpleBonus>;

const stackableBonusTypes: { [key in BonusType]: boolean } = {
    [BonusType.gear]: true,
    [BonusType.enhancement]: false,
    [BonusType.deflection]: true,
    [BonusType.natural]: false,
    [BonusType.temporal]: true,
    [BonusType.aura]: false,
} as const;

class MultiBonus implements FullMultiBonus, JsonExportable<MultiBonusBuilder> {
    #gear: SimpleBonus;
    #enhancement: SimpleBonus;
    #deflection: SimpleBonus;
    #natural: SimpleBonus;
    #temporal: SimpleBonus;
    #aura: SimpleBonus;

    constructor(builder: MultiBonusBuilder = {}) {
        this.#gear = new SimpleBonus(builder[BonusType.gear]);
        this.#enhancement = new SimpleBonus(builder[BonusType.enhancement]);
        this.#deflection = new SimpleBonus(builder[BonusType.deflection]);
        this.#natural = new SimpleBonus(builder[BonusType.natural]);
        this.#temporal = new SimpleBonus(builder[BonusType.temporal]);
        this.#aura = new SimpleBonus(builder[BonusType.aura]);
    }

    get gear(): SimpleBonus {
        return this.#gear;
    }

    get enhancement(): SimpleBonus {
        return this.#enhancement;
    }

    get deflection(): SimpleBonus {
        return this.#deflection;
    }

    get natural(): SimpleBonus {
        return this.#natural;
    }

    get temporal(): SimpleBonus {
        return this.#temporal;
    }

    get aura(): SimpleBonus {
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
