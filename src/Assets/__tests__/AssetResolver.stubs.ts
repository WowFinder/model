import { AssetType as AT } from '@wowfinder/ts-enums';
import { AssetResolver } from '../AssetResolver';
import { Adventure } from 'Adventure';
import { Character } from 'Character';
import { Class, Race } from 'Creature';
import { Faction } from 'Faction';
import { Item } from 'Item';
import { Spell, SpellList } from 'Magic';

function wrap<T>(type: AT, stub: jest.Mock): (key: string) => T {
    return (key: string) => stub(type, key);
}

function stubAssetResolver(stub: jest.Mock): any {
    return class extends AssetResolver {
        resolveAdventure = wrap<Adventure>(AT.adventures, stub);
        resolveCharacter = wrap<Character>(AT.characters, stub);
        resolveClass = wrap<Class>(AT.classes, stub);
        resolveFaction = wrap<Faction>(AT.factions, stub);
        resolveItem = wrap<Item>(AT.items, stub);
        resolveRace = wrap<Race>(AT.races, stub);
        resolveSpell = wrap<Spell>(AT.spells, stub);
        resolveSpellList = wrap<SpellList>(AT.spellLists, stub);
    };
}

export { stubAssetResolver };
