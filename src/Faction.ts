import { Reputation } from '@wowfinder/ts-enums';

const initialHatedScore = -42000;

const threshholds: { [key in Reputation]: number } = {
    hated: -42000,
    hostile: -6000,
    unfriendly: -3000,
    neutral: 0,
    friendly: 3000,
    honored: 9000,
    revered: 21000,
    exalted: 42000,
};
Object.freeze(threshholds);

const sortedDownTiers = ([...Object.keys(threshholds)] as Reputation[]).sort(
    (a: Reputation, b: Reputation): number => threshholds[b] - threshholds[a],
);
const lastRep = sortedDownTiers[sortedDownTiers.length - 1];

const sortedUpScores = [...Object.values(threshholds)].sort((a, b) => a - b);

function reputationByScoreNullable(score: number): Reputation | null {
    for (const k of sortedDownTiers) {
        if (score >= threshholds[k]) {
            return k;
        }
    }
    return null;
}
function reputationByScore(score: number): Reputation {
    return reputationByScoreNullable(score) ?? lastRep;
}

function nextScore(current: number): number {
    for (const score of sortedUpScores) {
        if (score > current) {
            return score;
        }
    }
    return NaN;
}

type Factions = {
    byKey: { [key: number]: Faction };
    byLabel: { [label: string]: Faction };
};

class Faction {
    readonly #key: number;
    readonly #label: string;
    readonly #name: string;

    constructor({
        key,
        label,
        name,
    }: {
        key: number;
        label: string;
        name: string;
    }) {
        this.#key = key;
        this.#label = label;
        this.#name = name;
        Object.freeze(this);
    }

    get key(): number {
        return this.#key;
    }

    get label(): string {
        return this.#label;
    }

    get name(): string {
        return this.#name;
    }

    toString(): string {
        return this.name;
    }

    /* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
    /** @deprecated */
    static load(): Factions {
        throw new Error('Reimplementation in modular strucutre required!');
    }
}

export type { Factions };
export {
    Faction,
    reputationByScore,
    nextScore,
    initialHatedScore,
    threshholds,
};
