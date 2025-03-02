import { RawStats } from '@wowfinder/asset-schemas';
import {
    RawClassEntries,
    RawCreatureAsset,
} from '@wowfinder/asset-schemas/Creature/base';
import type { AsyncAssetResolver } from '../Assets/AssetResolver';
import type { ClassEntry, ClassEntries } from './Class';
import type { Race } from './Race';
import { PersonalDetails, importPersonalDetails } from './Personal';

abstract class CreatureBase {
    readonly #resolver: AsyncAssetResolver;
    readonly #key: string;
    readonly #baseStats: RawStats;
    readonly #notes: string;
    readonly #personal: PersonalDetails;
    readonly #raceKey: string;
    readonly #classKeys: RawClassEntries;

    constructor(raw: RawCreatureAsset, resolver: AsyncAssetResolver) {
        this.#key = raw.key;
        this.#baseStats = { ...raw.baseStats };
        this.#resolver = resolver;
        this.#raceKey = raw.race;
        this.#notes = raw.notes ?? '';
        this.#personal = importPersonalDetails(raw.personal);
        this.#classKeys = raw.classes ?? [];
    }

    get key(): string {
        return this.#key;
    }

    get baseStats(): RawStats {
        return { ...this.#baseStats };
    }

    get race(): Promise<Race> {
        return this.#resolver.resolveRace(this.#raceKey);
    }

    get notes(): string {
        return this.#notes;
    }

    get personal(): PersonalDetails {
        return this.#personal;
    }

    get classes(): Promise<ClassEntries> {
        return Promise.all(
            this.#classKeys.map(async entry => ({
                class: await this.#resolver.resolveClass(entry.class),
                level: entry.level,
            })),
        );
    }
}

export type { ClassEntry, ClassEntries };

export { CreatureBase };
