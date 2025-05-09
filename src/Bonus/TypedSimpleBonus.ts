import { BonusType } from '@wowfinder/ts-enums';
import { SimpleBonus, type SimpleBonusBuilder } from './SimpleBonus';
import { type JsonCompatible, type JsonExportable } from '@wowfinder/ts-utils';

type TypedSimpleBonusBuilder = SimpleBonusBuilder & {
    type: BonusType;
};

class TypedSimpleBonus
    extends SimpleBonus
    implements JsonExportable<TypedSimpleBonusBuilder>
{
    readonly #type: BonusType;

    constructor({ type, ...rest }: TypedSimpleBonusBuilder) {
        super(rest);
        this.#type = type;
    }

    get type(): BonusType {
        return this.#type;
    }

    export(): JsonCompatible<TypedSimpleBonusBuilder> {
        return {
            ...super.export(),
            type: this.#type,
        };
    }

    retyped(type: BonusType): TypedSimpleBonus {
        return new TypedSimpleBonus({
            ...super.export(),
            type,
        });
    }

    static typedZero(type: BonusType): TypedSimpleBonus {
        return new TypedSimpleBonus({
            ...SimpleBonus.zero,
            type,
        });
    }

    static typedSum(...bonuses: TypedSimpleBonus[]): TypedSimpleBonus {
        const types = new Set(bonuses.map(b => b.type));
        if (types.size !== 1) {
            throw new Error('Cannot sum TypedSimpleBonuses of different types');
        }
        return new TypedSimpleBonus({
            ...SimpleBonus.sum(...bonuses).export(),
            type: bonuses[0].type,
        });
    }
}

export { TypedSimpleBonus, type TypedSimpleBonusBuilder };
