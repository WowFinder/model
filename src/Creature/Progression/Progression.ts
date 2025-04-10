import { Aura, ClassFeature, Skill } from '@wowfinder/ts-enums';
import {
    type SavesProgression,
    type CastingProgression,
    type FeaturesList,
    type AurasList,
} from '../Class';

type ProgressionConstructorArgs = {
    key: string;
    hitDie?: number;
    baseAttackProgression?: number;
    saves?: SavesProgression;
    casting?: CastingProgression;
    skillRanks?: number;
    features?: FeaturesList;
    auras?: AurasList;
    skills?: Set<Skill>;
};

// TODO: make readonly (depends on full deprecation and removal of old Character types)
type ProgressionEntry = { progression: Progression; level: number };
type ProgressionEntries = ProgressionEntry[];

abstract class Progression {
    readonly #key: string;
    readonly #hitDie: number;
    readonly #baseAttackProgression: number;
    readonly #saves: SavesProgression;
    readonly #casting: CastingProgression;
    readonly #skillRanks: number;
    readonly #features: FeaturesList;
    readonly #auras: AurasList;
    readonly #skills: Set<Skill>;

    protected constructor({
        key,
        hitDie = 0,
        baseAttackProgression = 0,
        saves = { fortitude: false, reflexes: false, will: false },
        casting = { arcane: 0, divine: 0, spontaneous: 0 },
        skillRanks = 0,
        features = [],
        auras = [],
        skills = new Set<Skill>(),
    }: ProgressionConstructorArgs) {
        this.#key = key;
        this.#hitDie = hitDie;
        this.#baseAttackProgression = baseAttackProgression;
        this.#saves = { ...saves };
        this.#casting = { ...casting };
        this.#skillRanks = skillRanks;
        this.#features = [...features];
        this.#auras = [...auras];
        this.#skills = new Set<Skill>(skills);
    }

    get key(): string {
        return this.#key;
    }

    get hitDie(): number {
        return this.#hitDie;
    }

    get baseAttackProgression(): number {
        return this.#baseAttackProgression;
    }

    get saves(): SavesProgression {
        return this.#saves;
    }
    get skillRanks(): number {
        return this.#skillRanks;
    }
    get casting(): CastingProgression {
        return this.#casting;
    }
    get features(): FeaturesList {
        return [...this.#features];
    }
    get auras(): AurasList {
        return [...this.#auras];
    }
    get skills(): Set<Skill> {
        return new Set(this.#skills);
    }

    featuresAtExactLevel(level: number): ClassFeature[] {
        return this.#features
            .filter(f => f.level === level)
            .map(f => f.feature);
    }

    featuresAtLevel(level: number): ClassFeature[] {
        return this.#features.filter(f => f.level <= level).map(f => f.feature);
    }

    aurasAtLevel(level: number): Aura[] {
        return this.#auras.filter(a => a.level <= level).map(a => a.aura);
    }
}

export {
    Progression,
    type ProgressionConstructorArgs,
    type ProgressionEntry,
    type ProgressionEntries,
};
