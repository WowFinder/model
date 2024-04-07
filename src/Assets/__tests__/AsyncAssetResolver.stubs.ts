import { AssetType } from '@wowfinder/ts-enums';
import { Adventure } from 'Adventure';
import { Class, Race } from 'Creature';
import { Faction } from 'Faction';
import { Item } from 'Item';
import { Spell, SpellList } from 'Magic';
import { AsyncAssetResolver } from 'Assets/AsyncAssetResolver';

function wrapPromise<T>(
    type: AssetType,
    stub: jest.Mock,
): (key: string) => Promise<T> {
    return async (key: string) => stub(type, key);
}

function stubAsyncAssetResolver(stub: jest.Mock): any {
    return class extends AsyncAssetResolver {
        resolveAdventure = wrapPromise<Adventure>(AssetType.adventures, stub);
        resolveClass = wrapPromise<Class>(AssetType.classes, stub);
        resolveFaction = wrapPromise<Faction>(AssetType.factions, stub);
        resolveItem = wrapPromise<Item>(AssetType.items, stub);
        resolveRace = wrapPromise<Race>(AssetType.races, stub);
        resolveSpell = wrapPromise<Spell>(AssetType.spells, stub);
        resolveSpellList = wrapPromise<SpellList>(AssetType.spellLists, stub);
        list = stub;
    };
}

export { stubAsyncAssetResolver };
