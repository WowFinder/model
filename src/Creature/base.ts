import { Stats } from '@wowfinder/asset-schemas';
import { RawCreatureAsset } from '@wowfinder/asset-schemas/dist/Creature/base';
import { BaseCreaturePersonal } from '@wowfinder/asset-schemas/dist/Creature/personal';
import { AssetResolver } from 'Assets/AssetResolver';
import { Class } from './Class';
import Race from 'Character/Race';

type ClassEntry = { class: Class; level: number };
type ClassEntries = ClassEntry[];

abstract class CreatureBase {
    #key: string;
    #baseStats: Stats;
    #race: Race;
    #notes: string;
    #personal: BaseCreaturePersonal;
    #classes: ClassEntries;

    constructor(raw: RawCreatureAsset, resolver: AssetResolver) {
        this.#key = raw.key;
        this.#baseStats = { ...raw.baseStats };
        this.#race = resolver.resolveRace(raw.race);
        this.#notes = raw.notes ?? '';
        this.#personal = { ...raw.personal };
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

    get personal(): BaseCreaturePersonal {
        return { ...this.#personal };
    }

    get classes(): ClassEntries {
        return this.#classes.map(entry => ({ ...entry }));
    }
}

export type { ClassEntry, ClassEntries };

export { CreatureBase };
