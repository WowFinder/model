import { Stats } from '@wowfinder/asset-schemas';
import { RawCreatureAsset } from '@wowfinder/asset-schemas/dist/Creature/base';
import type { AssetResolver } from 'Assets/AssetResolver';
import type { ClassEntry, ClassEntries } from './Class';
import type { Race } from './Race';
import { PersonalDetails, importPersonalDetails } from './Personal';

abstract class CreatureBase {
    #key: string;
    #baseStats: Stats;
    #race: Race;
    #notes: string;
    #personal: PersonalDetails;
    #classes: ClassEntries;

    constructor(raw: RawCreatureAsset, resolver: AssetResolver) {
        this.#key = raw.key;
        this.#baseStats = { ...raw.baseStats };
        this.#race = resolver.resolveRace(raw.race);
        this.#notes = raw.notes ?? '';
        // TODO: Actually parse personal details
        this.#personal = importPersonalDetails(raw.personal);
        this.#classes =
            raw.classes?.map(({ class: cls, level }) => ({
                class: resolver.resolveClass(cls),
                level,
            })) ?? [];
    }

    get key(): string {
        return this.#key;
    }

    get baseStats(): Stats {
        return { ...this.#baseStats };
    }

    get race(): Race {
        return this.#race;
    }

    get notes(): string {
        return this.#notes;
    }

    get personal(): PersonalDetails {
        return { ...this.#personal };
    }

    get classes(): ClassEntries {
        return this.#classes.map(entry => ({ ...entry }));
    }
}

export type { ClassEntry, ClassEntries };

export { CreatureBase };
