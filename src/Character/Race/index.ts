import { Alignment, Languages, Size } from '@wowfinder/ts-enums';
import { SkillSet } from '../Skill';
import { Speeds } from '../Speeds';
import { zeroDefault as statsZero } from '../Stats';
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

    constructor({
        key,
        size = Size.medium,
        statMods = statsZero,
        skillMods = {},
        bonusSkillRanks = 0,
        bonusStartingFeats = 0,
        initialLanguages,
        additionalLanguages,
        commonAlignments,
        speeds,
        saves,
    }: RawRaceAsset) {
        this.#key = key;
        this.#size = size;
        this.#statMods = statMods;
        this.#skillMods = skillMods;
        this.#bonusSkillRanks = bonusSkillRanks || 0;
        this.#bonusStartingFeats = bonusStartingFeats || 0;
        this.#initialLanguages = [...initialLanguages];
        this.#additionalLanguages = [...additionalLanguages];
        this.#commonAlignments = [...commonAlignments];
        this.#speeds = speeds ? new Speeds(speeds) : Speeds.default;
        this.#saves = {
            ...defaultSaves,
            ...(saves ?? {}),
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

    get bonusFeats(): number {
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

    static build(raw: any): Race {
        // TODO #437: Validate props
        return new Race(raw);
    }

    // static #loaded: Races | null = null;

    static load(): Races {
        throw new Error('Not implemented');
        /* return (this.#loaded ||= forceDataLoadKeyS(
            window.Main.asset('Races'),
            this.build,
        )); */
    }
}

export { Race, Races };
