import { ClassTier } from '@wowfinder/ts-enums';
import { Money } from '../../Item';
import { ProgressionBonuses } from '../Progression/ProgressionBonuses';
import { applyClassDefaults } from './builder';
import { combineProgressionBonuses } from '../Progression/combineProgressionBonuses';
import { filterSkills, mapAuras, mapFeatures } from '../Progression/helpers';
import { RawClassAsset } from '@wowfinder/asset-schemas';
import { Progression, ProgressionEntries } from '../Progression/Progression';

// TODO: make readonly (depends on full deprecation and removal of old Character types)
type ClassEntry = { class: Class; level: number };
type ClassEntries = ClassEntry[];

type Classes = { [key: string]: Class };

class Class extends Progression {
    readonly #tier: ClassTier;
    readonly #maxLevel: number;
    readonly #startingWealth: number;

    constructor(rawArgs: RawClassAsset) {
        const args = applyClassDefaults(rawArgs);
        super({
            key: args.key,
            hitDie: args.hitDie,
            baseAttackProgression: args.baseAttackProgression,
            saves: { ...args.goodSaves },
            casting: { ...args.spellCasting },
            skillRanks: args.skillRanks,
            features: mapFeatures(args.features),
            auras: mapAuras(args.features),
            skills: filterSkills(args.skills),
        });
        this.#maxLevel = args.maxLevel;
        this.#tier = args.tier;
        this.#startingWealth = args.startingWealth;
    }

    get tier(): ClassTier {
        return this.#tier;
    }

    get maxLevel(): number {
        return this.#maxLevel;
    }

    get startingWealth(): Money {
        return Money.fromRaw(this.#startingWealth);
    }

    /* istanbul ignore next: covered by `combineClassBonuses` tests */
    static multiclass(levels: ProgressionEntries): ProgressionBonuses {
        return combineProgressionBonuses(levels);
    }

    /* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
    /** @deprecated */
    static load(): Classes {
        throw new Error('Not implemented');
    }
}

function compareClassEntriesByLevelDescending(
    a: ClassEntry,
    b: ClassEntry,
): number {
    const keyCompare = a.class.key.localeCompare(b.class.key);
    const levelCompare = b.level - a.level;
    return levelCompare !== 0 ? levelCompare : keyCompare;
}

function mergeDuplicateEntries(entries: ClassEntries): ClassEntries {
    const merged: ClassEntries = [];

    for (const entry of entries) {
        const existingEntry = merged.find(e => e.class.key === entry.class.key);
        if (existingEntry) {
            existingEntry.level += entry.level;
        } else {
            merged.push({ ...entry });
        }
    }

    return merged;
}

function combinedClassEntries(classEntries: ClassEntries): ClassEntries {
    return mergeDuplicateEntries(classEntries).sort(
        compareClassEntriesByLevelDescending,
    );
}

export { Class, combinedClassEntries, type ClassEntry, type ClassEntries };
