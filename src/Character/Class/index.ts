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

function baseHitPoints(hd: number): [number, number] {
    const base = Math.ceil((hd + 1) / 2);
    const extra = hd - base;
    return [base, extra];
}
class Class {
    #key: string;
    #tier: ClassTier;
    #maxLevel: number;
    #hd: number;
    #bab: number;
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
        this.#hd = args.hd;
        this.#bab = args.bab;
        this.#saves = {
            fortitude: args.goodFortitude,
            reflexes: args.goodReflexes,
            will: args.goodWill,
        };
        this.#skillRanks = args.skillRanks;
        this.#casting = {
            arcane: args.arcane,
            divine: args.divine,
            spontaneous: args.spontaneous,
        };
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
        return this.#hd;
    }

    get baseAttack(): number {
        return this.#bab;
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

    static multiclass(classLevels: ClassLevels): ClassBonuses {
        return combineClassBonuses(classLevels);
    }

    /** @deprecated */
    static load(): Classes {
        throw new Error('Not implemented');
    }
}

export type { Classes, ClassLevels, ClassBonuses };
export { ClassFeature, Class, baseHitPoints };
