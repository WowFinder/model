import { sum } from '@wowfinder/ts-utils';
import { type Requirement } from '../../Requirements/base';
import { combineClassBonuses } from '../../Creature/Progression/combineProgressionBonuses';
import { type CharacterBaseInterface } from '../../Character';

abstract class LevelRequirementBase
    implements Requirement<CharacterBaseInterface>
{
    readonly #level: number;
    constructor(level: number) {
        this.#level = level;
    }

    get level(): number {
        return this.#level;
    }

    abstract test(value: CharacterBaseInterface): boolean;
}

class CharacterLevelRequirement extends LevelRequirementBase {
    test(value: CharacterBaseInterface): boolean {
        const charLevel = sum(
            ...value.classProgression.map(entry => entry.level),
        );
        return charLevel >= this.level;
    }
}

class CasterLevelRequirement extends LevelRequirementBase {
    test(value: CharacterBaseInterface): boolean {
        const { efl } = combineClassBonuses(value.classProgression);
        return efl.arcane + efl.divine + efl.spontaneous >= this.level;
    }
}

class AttackBonusRequirement extends LevelRequirementBase {
    test(value: CharacterBaseInterface): boolean {
        const { bab } = combineClassBonuses(value.classProgression);
        return bab >= this.level;
    }
}

export {
    AttackBonusRequirement,
    CasterLevelRequirement,
    CharacterLevelRequirement,
};
