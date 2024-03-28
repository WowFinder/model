import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';
import { Feat } from '../Character/Feats';

type FeatsBonusBuilder = Feat[];

const featKeys = Object.keys(Feat).map(key => key as Feat);

class FeatsBonus implements JsonExportable<Feat[]> {
    #feats: Set<Feat>;

    constructor(builder: Iterable<Feat> = []) {
        this.#feats = new Set(builder);
    }

    get(feat: Feat): boolean {
        return this.#feats.has(feat);
    }

    get isZero(): boolean {
        return this.#feats.size === 0;
    }

    export(): JsonCompatible<Feat[]> {
        return [...this.#feats];
    }

    static get zero(): FeatsBonus {
        return new FeatsBonus();
    }

    static max(...bonuses: FeatsBonus[]): FeatsBonus {
        return new FeatsBonus(
            featKeys.filter(feat =>
                bonuses.some(bonus => bonus.#feats.has(feat)),
            ),
        );
    }
}

export type { FeatsBonusBuilder };
export { FeatsBonus };
