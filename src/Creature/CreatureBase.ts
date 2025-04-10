import {
    RawClassEntries,
    RawCreatureAsset,
    RawStats,
} from '@wowfinder/asset-schemas';
import type { ClassEntry, ClassEntries } from './Class';
import type { Race } from './Race';
import { importPersonalDetails, PersonalDetails } from './Personal';
import { AsyncAssetResolver } from '../Assets';

type CreatureBaseConstructorArgs = {
    key: string;
    baseStats: RawStats;
    personal: PersonalDetails;
    notes?: string;
    race: Race;
    classes: ClassEntries;
};

class CreatureBase {
    readonly #key: string;
    readonly #baseStats: RawStats;
    readonly #personal: PersonalDetails;
    readonly #notes: string;
    readonly #race: Race;
    readonly #classes: ClassEntries;

    protected constructor({
        key,
        baseStats,
        personal,
        notes = '',
        race,
        classes,
    }: CreatureBaseConstructorArgs) {
        this.#key = key;
        this.#baseStats = baseStats;
        this.#personal = personal;
        this.#notes = notes;
        this.#race = race;
        this.#classes = classes;
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

    static async buildCreature(
        rawAsset: RawCreatureAsset,
        resolver: AsyncAssetResolver,
    ): Promise<CreatureBase> {
        const rawClasses: RawClassEntries = rawAsset.classes ?? [];
        const args: CreatureBaseConstructorArgs = {
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
        };
        return new this(args);
    }
}

export { CreatureBase, type ClassEntry, type ClassEntries };
