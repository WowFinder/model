import { Character, Characters } from './Character';
import { Class, Classes } from './Character/Class';
import { Faction, Factions } from './Faction';
import { Item } from './Item';
import { Race, Races } from './Character/Race';

class FullData {
    #factions: Factions;
    #chars: Characters;
    #classes: Classes;
    #races: Races;
    #items: any; // ByKeyRecursive<Item>;
    private constructor() {
        this.#factions = Faction.load();
        this.#chars = Character.load();
        this.#classes = Class.load();
        this.#races = Race.load();
        this.#items = Item.load(/* buildItem, reThrowErrors */);
        this.#items = Item.load();
    }

    get factions(): Factions {
        return this.#factions;
    }

    get chars(): Characters {
        return this.#chars;
    }

    get classes(): Classes {
        return this.#classes;
    }

    get races(): Races {
        return this.#races;
    }

    get items(): any /* ByKeyRecursive<Item> */ {
        return this.#items;
    }
}

export { /** @deprecated */ FullData };
