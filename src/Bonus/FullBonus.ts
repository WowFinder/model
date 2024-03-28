import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';
import { SimpleBonus } from './SimpleBonus';
import { SimpleBonusBuilder } from './SimpleBonus.builder';
import { BonusType } from '@wowfinder/ts-enums';
import { maxBonus, sumBonus } from './SimpleBonus.helpers';

/* TODO Remove from BonusType in ts-enums:
    armor, shield, complement, enchant (absorbed by gear)
    dodge (absorbed by deflection)
    racial (absorbed by natural)
 */
type AdjustedBonusType = Exclude<
    BonusType,
    'armor' | 'shield' | 'complement' | 'enchant' | 'racial' | 'dodge'
>;
const AdjustedBonusType: { [key in AdjustedBonusType]: AdjustedBonusType } = {
    gear: BonusType.gear,
    enhancement: BonusType.enhancement,
    deflection: BonusType.deflection,
    natural: BonusType.natural,
    temporal: BonusType.temporal,
    aura: BonusType.aura,
};

type BaseMultiBonus = { [key in AdjustedBonusType]?: SimpleBonus };
type ExportableMultiBonus = { [key in AdjustedBonusType]?: SimpleBonusBuilder };
type BaseFullBonus = Record<AdjustedBonusType, SimpleBonus>;

const stackableBonusTypes: { [key in AdjustedBonusType]: boolean } = {
    [BonusType.gear]: true,
    [BonusType.enhancement]: false,
    [BonusType.deflection]: true,
    [BonusType.natural]: false,
    [BonusType.temporal]: true,
    [BonusType.aura]: false,
} as const;

class FullBonus implements BaseFullBonus, JsonExportable<ExportableMultiBonus> {
    #gear: SimpleBonus;
    #enhancement: SimpleBonus;
    #deflection: SimpleBonus;
    #natural: SimpleBonus;
    #temporal: SimpleBonus;
    #aura: SimpleBonus;

    constructor(builder: BaseMultiBonus) {
        this.#gear = builder[BonusType.gear] ?? new SimpleBonus({});
        this.#enhancement =
            builder[BonusType.enhancement] ?? new SimpleBonus({});
        this.#deflection = builder[BonusType.deflection] ?? new SimpleBonus({});
        this.#natural = builder[BonusType.natural] ?? new SimpleBonus({});
        this.#temporal = builder[BonusType.temporal] ?? new SimpleBonus({});
        this.#aura = builder[BonusType.aura] ?? new SimpleBonus({});
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

    export(): JsonCompatible<ExportableMultiBonus> {
        const obj: ExportableMultiBonus = {};
        Object.keys(AdjustedBonusType).forEach(type => {
            if (this[type as AdjustedBonusType]) {
                obj[type as AdjustedBonusType] =
                    this[type as AdjustedBonusType].export();
            }
        });
        return obj;
    }

    static combine(...bonuses: FullBonus[]): FullBonus {
        const builder: BaseMultiBonus = {};
        Object.keys(stackableBonusTypes).forEach(type => {
            if (stackableBonusTypes[type as AdjustedBonusType]) {
                builder[type as AdjustedBonusType] = new SimpleBonus(
                    sumBonus(...bonuses.map(b => b[type as AdjustedBonusType])),
                );
            } else {
                builder[type as AdjustedBonusType] = new SimpleBonus(
                    maxBonus(...bonuses.map(b => b[type as AdjustedBonusType])),
                );
            }
        });
        return new FullBonus(builder);
    }
}

export type { BaseMultiBonus as FullBonusBuilder, ExportableMultiBonus };
export { FullBonus, stackableBonusTypes };
