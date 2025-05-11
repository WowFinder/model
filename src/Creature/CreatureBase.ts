import {
    RawClassEntries,
    RawCreatureAsset,
    type RawFeatSelections,
    RawStats,
} from '@wowfinder/asset-schemas';
import type { ClassEntry, ClassEntries } from './Class';
import type { Race } from './Race';
import { importPersonalDetails, PersonalDetails } from './Personal';
import { AsyncAssetResolver } from '../Assets';
import { type Feat } from './Feats/Feat';

type CreatureBaseBuilder = {
    key: string;
    baseStats: RawStats;
    personal: PersonalDetails;
    notes?: string;
    race: Race;
    classes?: ClassEntries;
    feats?: RawFeatSelections;
};

abstract class CreatureBase {
    readonly #key: string;
    readonly #baseStats: RawStats;
    readonly #personal: PersonalDetails;
    readonly #notes: string;
    readonly #race: Race;
    readonly #classes: ClassEntries;
    readonly #feats: RawFeatSelections;

    constructor({
        key,
        baseStats,
        personal,
        notes = '',
        race,
        classes = [],
        feats = [],
    }: CreatureBaseBuilder) {
        this.#key = key;
        this.#baseStats = baseStats;
        this.#personal = personal;
        this.#notes = notes;
        this.#race = race;
        this.#classes = classes;
        this.#feats = feats;
    }

    get key(): string {
        return this.#key;
    }

    get baseStats(): RawStats {
        return { ...this.#baseStats };
    }

    get race(): Race {
        return this.#race;
    }

    get notes(): string {
        return this.#notes;
    }

    get personal(): PersonalDetails {
        return this.#personal;
    }

    get classes(): ClassEntries {
        return [...this.#classes];
    }

    get featSelections(): RawFeatSelections {
        return [...this.#feats];
    }

    get feats(): Feat[] {
        return this.#feats.map(selection => selection.feat as Feat).toSorted();
    }

    static async buildCreatureArgs(
        rawAsset: RawCreatureAsset,
        resolver: AsyncAssetResolver,
    ): Promise<CreatureBaseBuilder> {
        const rawClasses: RawClassEntries = rawAsset.classes ?? [];
        return {
            key: rawAsset.key,
            baseStats: rawAsset.baseStats,
            personal: importPersonalDetails(rawAsset.personal),
            notes: rawAsset.notes,
            race: await resolver.resolveRace(rawAsset.race),
            classes: await Promise.all(
                rawClasses.map(async classEntry => {
                    const classAsset = await resolver.resolveClass(
                        classEntry.class,
                    );
                    return {
                        class: classAsset,
                        level: classEntry.level,
                    };
                }),
            ),
            feats: rawAsset.feats,
        };
    }
}

export {
    CreatureBase,
    type ClassEntry,
    type ClassEntries,
    type CreatureBaseBuilder,
};
