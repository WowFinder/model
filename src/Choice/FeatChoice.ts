import { FeatFlag } from '@wowfinder/ts-enums';
import { feats, FeatSpec } from '../Creature/Feats';
import { BaseChoiceBuilder, Choice } from './Choice';

type FeatChoiceBuilder = BaseChoiceBuilder & {
    validFeats: FeatSpec[];
};

class FeatChoice extends Choice<FeatSpec> {
    static #validator(validFeats: FeatSpec[]) {
        return (value: any) => {
            value = feats[value as keyof typeof feats] || value;
            return value instanceof FeatSpec && validFeats.includes(value);
        };
    }

    constructor({ label, validFeats }: FeatChoiceBuilder) {
        super({ label, validator: FeatChoice.#validator(validFeats) });
    }
}

class CombatFeatChoice extends FeatChoice {
    constructor({ label }: BaseChoiceBuilder) {
        const validFeats = Object.values(feats).filter((feat: FeatSpec) =>
            feat.hasFlag(FeatFlag.combat),
        );
        super({ label, validFeats });
    }
}

class MagicFeatChoice extends FeatChoice {
    constructor({ label }: BaseChoiceBuilder) {
        const validFeats = Object.values(feats).filter((feat: FeatSpec) =>
            feat.hasFlag(FeatFlag.magic),
        );
        super({ label, validFeats });
    }
}

export { FeatChoice, CombatFeatChoice, MagicFeatChoice };
