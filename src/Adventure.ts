import { JsonExportable, safeJsonClone } from '@wowfinder/ts-utils';
import type { RewardsByCharacter } from './Rewards';
import { RawAdventureAsset } from '@wowfinder/asset-schemas';

function combineRewards(rewards: RewardsByCharacter[]): RewardsByCharacter {
    const result: RewardsByCharacter = {};
    for (const r of rewards) {
        for (const c of Object.keys(r)) {
            if (result[c]) {
                for (const f of Object.keys(r[c])) {
                    result[c][f] ||= 0;
                    result[c][f] += r[c][f];
                }
            } else {
                result[c] = safeJsonClone(r[c]);
            }
        }
    }
    return Object.freeze(result);
}

type Adventures = { [key: string]: Adventure };

class Adventure implements JsonExportable<RawAdventureAsset> {
    readonly #key: string;
    readonly #title: string;
    readonly #date: string;
    readonly #rewards: RewardsByCharacter;

    constructor({ key, title, date, rewards }: RawAdventureAsset) {
        this.#key = key;
        this.#title = title;
        this.#date = date;
        this.#rewards = rewards;
    }

    get key(): string {
        return this.#key;
    }

    get title(): string {
        return this.#title;
    }

    get date(): string {
        return this.#date;
    }

    get rewards(): RewardsByCharacter {
        return this.#rewards;
    }

    // String representation suitable for sorting (by date, then title)
    toString(): string {
        return `[${this.#date}] ${this.#title}`;
    }

    static combined(adventures: Iterable<Adventure>): RewardsByCharacter {
        return combineRewards([...adventures].map(a => a.rewards));
    }

    export(): RawAdventureAsset {
        return {
            key: this.#key,
            title: this.#title,
            date: this.#date,
            rewards: this.#rewards,
        };
    }
}

export type { Adventures };
export { Adventure };
