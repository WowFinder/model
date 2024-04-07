import { AssetType } from '@wowfinder/ts-enums';
import { AssetResolver } from '../AssetResolver';
import { Adventure } from 'Adventure';
import { Class, Race } from 'Creature';
import { Faction } from 'Faction';
import { Item } from 'Item';
import { Spell, SpellList } from 'Magic';

function wrap<T>(type: AssetType, stub: jest.Mock): (key: string) => T {
    return (key: string) => stub(type, key);
}

function stubAssetResolver(stub: jest.Mock): any {
    return class extends AssetResolver {
        resolveAdventure = wrap<Adventure>(AssetType.adventures, stub);
        resolveClass = wrap<Class>(AssetType.classes, stub);
        resolveFaction = wrap<Faction>(AssetType.factions, stub);
        resolveItem = wrap<Item>(AssetType.items, stub);
        resolveRace = wrap<Race>(AssetType.races, stub);
        resolveSpell = wrap<Spell>(AssetType.spells, stub);
        resolveSpellList = wrap<SpellList>(AssetType.spellLists, stub);
        list = stub;
    };
}

export { stubAssetResolver };
