import { sum } from '@wowfinder/ts-utils';
import { type CharacterRequirementsPlaceholder } from '../../Old.Character/Requirements/base';
import { type CharacterOverride } from '../../Old.Character/base/CharacterOverride';
import { type Transformation } from '../base';

const druidClasses = ['drd', 'mocked-druidric-class'];

type ShapeshiftBuilder = {
    rank: number;
};
abstract class Shapeshift implements Transformation {
    readonly #rank: number;

    protected constructor({ rank }: ShapeshiftBuilder) {
        this.#rank = rank;
    }

    get rank(): number {
        return this.#rank;
    }

    abstract compute(
        base: CharacterRequirementsPlaceholder,
        rank: number,
    ): CharacterOverride;

    apply(base: any): any {
        // TODO: Reimplement
        throw new Error('Not implemented yet');
    }

    static defaultSize(rank: number): number {
        return rank < 3 ? 0 : Math.floor((rank - 1) / 2);
    }

    static effectiveDruidLevel(base: CharacterRequirementsPlaceholder): number {
        return sum(
            ...base.baseProfile.progression.classes
                .filter(c => druidClasses.includes(c.class.key))
                .map(c => c.level),
        );
    }
}

export { Shapeshift };
export type { ShapeshiftBuilder };
