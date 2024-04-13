import { AssetType } from '@wowfinder/ts-enums';
import { ForcedKeyResolver } from '@wowfinder/ts-utils';
import type { Adventure } from '../Adventure';
import type { Class } from '../Creature/Class';
import type { Race } from '../Creature/Race';
import type { Faction } from '../Faction';
import type { Item } from '../Item';
import type { Spell, SpellList } from '../Magic';

type ResolvableAssetType = Exclude<AssetType, AssetType.characters>;

type AnyResolvableAsset =
    | Adventure
    | Class
    | Faction
    | Item
    | Race
    | Spell
    | SpellList;

interface AdventureAssetResolver {
    resolveAdventure: ForcedKeyResolver<Adventure>;
    resolve(type: AssetType.adventures, key: string): Adventure;
}

interface AdventureAsyncAssetResolver {
    resolveAdventure: ForcedKeyResolver<Promise<Adventure>>;
    resolve(type: AssetType.adventures, key: string): Promise<Adventure>;
}

interface ClassAssetResolver {
    resolveClass: ForcedKeyResolver<Class>;
    resolve(type: AssetType.classes, key: string): Class;
}

interface ClassAsyncAssetResolver {
    resolveClass: ForcedKeyResolver<Promise<Class>>;
    resolve(type: AssetType.classes, key: string): Promise<Class>;
}

interface FactionAssetResolver {
    resolveFaction: ForcedKeyResolver<Faction>;
    resolve(type: AssetType.factions, key: string): Faction;
}

interface FactionAsyncAssetResolver {
    resolveFaction: ForcedKeyResolver<Promise<Faction>>;
    resolve(type: AssetType.factions, key: string): Promise<Faction>;
}

interface ItemAssetResolver {
    resolveItem: ForcedKeyResolver<Item>;
    resolve(type: AssetType.items, key: string): Item;
}

interface ItemAsyncAssetResolver {
    resolveItem: ForcedKeyResolver<Promise<Item>>;
    resolve(type: AssetType.items, key: string): Promise<Item>;
}

interface RaceAssetResolver {
    resolveRace: ForcedKeyResolver<Race>;
    resolve(type: AssetType.races, key: string): Race;
}

interface RaceAsyncAssetResolver {
    resolveRace: ForcedKeyResolver<Promise<Race>>;
    resolve(type: AssetType.races, key: string): Promise<Race>;
}

interface SpellAssetResolver {
    resolveSpell: ForcedKeyResolver<Spell>;
    resolve(type: AssetType.spells, key: string): Spell;
}

interface SpellAsyncAssetResolver {
    resolveSpell: ForcedKeyResolver<Promise<Spell>>;
    resolve(type: AssetType.spells, key: string): Promise<Spell>;
}

interface SpellListAssetResolver {
    resolveSpellList: ForcedKeyResolver<SpellList>;
    resolve(type: AssetType.spellLists, key: string): SpellList;
}

interface SpellListAsyncAssetResolver {
    resolveSpellList: ForcedKeyResolver<Promise<SpellList>>;
    resolve(type: AssetType.spellLists, key: string): Promise<SpellList>;
}

export type {
    AdventureAssetResolver,
    AdventureAsyncAssetResolver,
    AnyResolvableAsset,
    ClassAssetResolver,
    ClassAsyncAssetResolver,
    FactionAssetResolver,
    FactionAsyncAssetResolver,
    ItemAssetResolver,
    ItemAsyncAssetResolver,
    RaceAssetResolver,
    RaceAsyncAssetResolver,
    ResolvableAssetType,
    SpellAssetResolver,
    SpellAsyncAssetResolver,
    SpellListAssetResolver,
    SpellListAsyncAssetResolver,
};
