import { RawStats } from '@wowfinder/asset-schemas';
import { RawCreatureAsset } from '@wowfinder/asset-schemas/dist/Creature/base';
import type { AsyncAssetResolver } from 'Assets/AssetResolver';
import type { ClassEntry, ClassEntries } from './Class';
import type { Race } from './Race';
import { PersonalDetails, importPersonalDetails } from './Personal';

abstract class CreatureBase {
    #key: string;
    #baseStats: RawStats;
    #race: Promise<Race>;
    #notes: string;
    #personal: PersonalDetails;
    #classes: Promise<ClassEntries>;

    constructor(raw: RawCreatureAsset, resolver: AsyncAssetResolver) {
        this.#key = raw.key;
        this.#baseStats = { ...raw.baseStats };
        this.#race = resolver.resolveRace(raw.race);
        this.#notes = raw.notes ?? '';
        this.#personal = importPersonalDetails(raw.personal);
        this.#classes = Promise.all(
            (raw.classes ?? []).map(async ({ class: cls, level }) => ({
                class: await resolver.resolveClass(cls),
                level,
            })),
        );
    }

    get key(): string {
        return this.#key;
    }

    get baseStats(): RawStats {
        return { ...this.#baseStats };
    }

    get race(): Promise<Race> {
        return this.#race;
    }

    get notes(): string {
        return this.#notes;
    }

    get personal(): PersonalDetails {
        return this.#personal;
    }

    get classes(): Promise<ClassEntries> {
        return this.#classes;
    }
}

export type { ClassEntry, ClassEntries };

export { CreatureBase };
