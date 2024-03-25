import { AssetType } from '@wowfinder/ts-enums';
import { ForcedKeyResolver } from '@wowfinder/ts-utils';
import type { Adventure } from 'Adventure';
import type { Character } from 'Character';
import type { Class } from 'Creature/Class';
import type { Race } from 'Creature/Race';
import type { Faction } from 'Faction';
import type { Item } from 'Item';
import type { Spell, SpellList } from 'Magic';

interface AdventureAssetResolver {
    resolveAdventure: ForcedKeyResolver<Adventure>;
    resolve(type: AssetType.adventures, key: string): Adventure;
}

interface CharacterAssetResolver {
    resolveCharacter: ForcedKeyResolver<Character>;
    resolve(type: AssetType.characters, key: string): Character;
}

interface ClassAssetResolver {
    resolveClass: ForcedKeyResolver<Class>;
    resolve(type: AssetType.classes, key: string): Class;
}

interface FactionAssetResolver {
    resolveFaction: ForcedKeyResolver<Faction>;
    resolve(type: AssetType.factions, key: string): Faction;
}

interface ItemAssetResolver {
    resolveItem: ForcedKeyResolver<Item>;
    resolve(type: AssetType.items, key: string): Item;
}

interface RaceAssetResolver {
    resolveRace: ForcedKeyResolver<Race>;
    resolve(type: AssetType.races, key: string): Race;
}

interface SpellAssetResolver {
    resolveSpell: ForcedKeyResolver<Spell>;
    resolve(type: AssetType.spells, key: string): Spell;
}

interface SpellListAssetResolver {
    resolveSpellList: ForcedKeyResolver<SpellList>;
    resolve(type: AssetType.spellLists, key: string): SpellList;
}

export {
    AdventureAssetResolver,
    CharacterAssetResolver,
    ClassAssetResolver,
    FactionAssetResolver,
    ItemAssetResolver,
    RaceAssetResolver,
    SpellAssetResolver,
    SpellListAssetResolver,
};
