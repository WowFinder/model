import { Alignment, Languages, Size } from '@wowfinder/ts-enums';
import { SkillSet } from '../Skill';
import { Speeds } from '../Speeds';
import { RawRaceAsset, RawSaves, RawStats } from '@wowfinder/asset-schemas';

type Races = { [key: string]: Race };

const defaultSaves: RawSaves = {
    fortitude: 0,
    reflexes: 0,
    will: 0,
};

export default class Race {
    readonly #key: string;
    readonly #size: Size;
    readonly #statMods: RawStats;
    readonly #skillMods: SkillSet;
    readonly #bonusSkillRanks: number;
    readonly #bonusStartingFeats: number;
    readonly #initialLanguages: Languages[];
    readonly #additionalLanguages: Languages[];
    readonly #commonAlignments: Alignment[];
    readonly #speeds: Speeds;
    readonly #saves: RawSaves;

    constructor(raw: RawRaceAsset) {
        this.#key = raw.key;
        this.#size = raw.size;
        this.#statMods = { ...raw.statMods };
        this.#skillMods = { ...(raw.skillMods ?? {}) };
        this.#bonusSkillRanks = raw.bonusSkillRanks ?? 0;
        this.#bonusStartingFeats = raw.bonusStartingFeats ?? 0;
        this.#initialLanguages = [...raw.initialLanguages];
        this.#additionalLanguages = [...raw.additionalLanguages];
        this.#commonAlignments = [...raw.commonAlignments];
        this.#speeds = new Speeds(raw.speeds);
        this.#saves = {
            ...defaultSaves,
            ...(raw.saves ?? {}),
        };
    }

    get key(): string {
        return this.#key;
    }

    get size(): Size {
        return this.#size;
    }

    get statMods(): RawStats {
        return { ...this.#statMods };
    }

    get skillMods(): SkillSet {
        return { ...this.#skillMods };
    }

    get bonusSkillRanksPerLevel(): number {
        return this.#bonusSkillRanks;
    }

    get bonusStartingFeats(): number {
        return this.#bonusStartingFeats;
    }

    get initialLanguages(): Languages[] {
        return [...this.#initialLanguages];
    }

    get additionalLanguages(): Languages[] {
        return [...this.#additionalLanguages];
    }

    get commonAlignments(): Alignment[] {
        return [...this.#commonAlignments];
    }

    isCommonAlignment(alignment: Alignment): boolean {
        return this.#commonAlignments.includes(alignment);
    }

    get speeds(): Speeds {
        return new Speeds(this.#speeds);
    }

    get saves(): RawSaves {
        return { ...this.#saves };
    }

    get naturalArmor(): number {
        return 0;
    }

    /* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
    /** @deprecated */
    static load(): Races {
        throw new Error('Not implemented');
    }
}

export { Race, Races };
