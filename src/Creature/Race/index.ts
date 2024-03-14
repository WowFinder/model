import { Alignment, Languages, Size } from '@wowfinder/ts-enums';
import { SkillSet } from '../../Character/Skill';
import { Speeds } from '../../Character/Speeds';
import { RawRaceAsset, Saves, Stats } from '@wowfinder/asset-schemas';

type Races = { [key: string]: Race };

const defaultSaves: Saves = {
    fortitude: 0,
    reflexes: 0,
    will: 0,
};

export default class Race {
    #key: string;
    #size: Size;
    #statMods: Stats;
    #skillMods: SkillSet;
    #bonusSkillRanks: number;
    #bonusStartingFeats: number;
    #initialLanguages: Languages[];
    #additionalLanguages: Languages[];
    #commonAlignments: Alignment[];
    #speeds: Speeds;
    #saves: Saves;

    constructor(raw: RawRaceAsset) {
        this.#key = raw.key;
        this.#size = raw.size;
        this.#statMods = raw.statMods;
        this.#skillMods = raw.skillMods ?? {};
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

    get statMods(): Stats {
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

    get saves(): Saves {
        return { ...this.#saves };
    }

    get naturalArmor(): number {
        return 0;
    }

    /** @deprecated */
    static load(): Races {
        throw new Error('Not implemented');
    }
}

export { Race, Races };
