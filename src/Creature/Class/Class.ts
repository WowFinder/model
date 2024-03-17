import { Aura, ClassTier, Skill } from '@wowfinder/ts-enums';
import { Money } from '../../Item';
import { AurasList } from './Aura';
import { ClassBonuses } from './ClassBonuses';
import { ClassFeature, FeaturesList } from './Features';
import { applyClassDefaults } from './builder';
import { combineClassBonuses } from './combineClassBonuses';
import {
    CastingProgression,
    ClassLevels,
    Classes,
    SavesProgression,
    filterSkills,
    mapAuras,
    mapFeatures,
} from './helpers';
import { RawClassAsset } from '@wowfinder/asset-schemas';

class Class {
    #key: string;
    #tier: ClassTier;
    #maxLevel: number;
    #hitDie: number;
    #baseAttackProgression: number;
    #saves: SavesProgression;
    #skillRanks: number;
    #casting: CastingProgression;
    #startingWealth: number;
    #features: FeaturesList;
    #auras: AurasList;
    #skills: Set<Skill>;

    constructor(rawArgs: RawClassAsset) {
        const args = applyClassDefaults(rawArgs);
        this.#key = args.key;
        this.#maxLevel = args.maxLevel;
        this.#tier = args.tier;
        this.#hitDie = args.hitDie;
        this.#baseAttackProgression = args.baseAttackProgression;
        this.#saves = { ...args.goodSaves };
        this.#skillRanks = args.skillRanks;
        this.#casting = { ...args.spellCasting };
        this.#startingWealth = args.startingWealth;
        this.#features = mapFeatures(args.features);
        this.#auras = mapAuras(args.features);
        this.#skills = filterSkills(args.skills);
    }

    get key(): string {
        return this.#key;
    }

    get tier(): ClassTier {
        return this.#tier;
    }

    get maxLevel(): number {
        return this.#maxLevel;
    }

    get hitDie(): number {
        return this.#hitDie;
    }

    get baseAttackProgression(): number {
        return this.#baseAttackProgression;
    }

    get saves(): SavesProgression {
        return { ...this.#saves };
    }

    get skillRanks(): number {
        return this.#skillRanks;
    }

    get classSkills(): Set<Skill> {
        return new Set(this.#skills);
    }

    get casting(): CastingProgression {
        return { ...this.#casting };
    }

    get featuresList(): FeaturesList {
        return [...this.#features];
    }

    featuresAt(level: number): ClassFeature[] {
        return this.#features
            .filter(f => f.level === level)
            .map(f => f.feature);
    }

    features(level: number): ClassFeature[] {
        return this.#features.filter(f => f.level <= level).map(f => f.feature);
    }

    get aurasList(): AurasList {
        return [...this.#auras];
    }

    auras(level: number): Aura[] {
        return this.#auras.filter(a => a.level <= level).map(a => a.aura);
    }

    get startingWealth(): Money {
        return Money.fromRaw(this.#startingWealth);
    }

    /* istanbul ignore next: covered by `combineClassBonuses` tests */
    static multiclass(classLevels: ClassLevels): ClassBonuses {
        return combineClassBonuses(classLevels);
    }

    /* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
    /** @deprecated */
    static load(): Classes {
        throw new Error('Not implemented');
    }
}

export { Class };
