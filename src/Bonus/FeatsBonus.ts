import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';
import { Feat, feats } from '../Creature/Feats';

type FeatsBonusBuilder = Feat[];

function clearRedundantFeatDuplicates(list: Feat[]): Feat[] {
    const uniqueFeats = new Set<Feat>(list.filter(f => !feats[f].multiple));
    return [...uniqueFeats, ...list.filter(f => feats[f].multiple)];
}

class FeatsBonus implements JsonExportable<Feat[]> {
    readonly #feats: Feat[];

    constructor(builder: Iterable<Feat> = []) {
        this.#feats = clearRedundantFeatDuplicates([...builder]);
    }

    get(feat: Feat): number {
        return this.#feats.filter(f => f === feat).length;
    }

    get isZero(): boolean {
        return this.#feats.length === 0;
    }

    export(): JsonCompatible<Feat[]> {
        return [...this.#feats]
            .filter(x => !!x)
            .toSorted((a: string, b: string) => a.localeCompare(b));
    }

    static get zero(): FeatsBonus {
        return new FeatsBonus();
    }

    static max(...bonuses: FeatsBonus[]): FeatsBonus {
        return new FeatsBonus(bonuses.flatMap(bonus => bonus.#feats));
    }
}

export type { FeatsBonusBuilder };
export { FeatsBonus };
