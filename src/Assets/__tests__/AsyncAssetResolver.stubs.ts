import { AssetType } from '@wowfinder/ts-enums';
import type { Adventure } from '../../Adventure';
import type { Class, Race } from '../../Creature';
import type { Faction } from '../../Faction';
import type { Item } from '../../Item';
import type { Spell, SpellList } from '../../Magic';
import { AsyncAssetResolver } from '../AsyncAssetResolver';

class StubbedAsyncAssetResolver extends AsyncAssetResolver {
    readonly #stub: jest.Mock;
    constructor(stub: jest.Mock) {
        super();
        this.#stub = stub;
    }

    resolveAdventure(key: string): Promise<Adventure> {
        return Promise.resolve(this.#stub(AssetType.adventures, key));
    }

    resolveClass(key: string): Promise<Class> {
        return Promise.resolve(this.#stub(AssetType.classes, key));
    }

    resolveFaction(key: string): Promise<Faction> {
        return Promise.resolve(this.#stub(AssetType.factions, key));
    }

    resolveItem(key: string): Promise<Item> {
        return Promise.resolve(this.#stub(AssetType.items, key));
    }

    resolveRace(key: string): Promise<Race> {
        return Promise.resolve(this.#stub(AssetType.races, key));
    }

    resolveSpell(key: string): Promise<Spell> {
        return Promise.resolve(this.#stub(AssetType.spells, key));
    }

    resolveSpellList(key: string): Promise<SpellList> {
        return Promise.resolve(this.#stub(AssetType.spellLists, key));
    }

    list(type: AssetType): Promise<string[]> {
        return Promise.resolve(this.#stub(type));
    }
}

export { StubbedAsyncAssetResolver };
