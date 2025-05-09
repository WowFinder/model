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

type AdventureAssetResolver = {
    resolveAdventure: ForcedKeyResolver<Adventure>;
    resolve(type: AssetType.adventures, key: string): Adventure;
};

type AdventureAsyncAssetResolver = {
    resolveAdventure: ForcedKeyResolver<Promise<Adventure>>;
    resolve(type: AssetType.adventures, key: string): Promise<Adventure>;
};

type ClassAssetResolver = {
    resolveClass: ForcedKeyResolver<Class>;
    resolve(type: AssetType.classes, key: string): Class;
};

type ClassAsyncAssetResolver = {
    resolveClass: ForcedKeyResolver<Promise<Class>>;
    resolve(type: AssetType.classes, key: string): Promise<Class>;
};

type FactionAssetResolver = {
    resolveFaction: ForcedKeyResolver<Faction>;
    resolve(type: AssetType.factions, key: string): Faction;
};

type FactionAsyncAssetResolver = {
    resolveFaction: ForcedKeyResolver<Promise<Faction>>;
    resolve(type: AssetType.factions, key: string): Promise<Faction>;
};

type ItemAssetResolver = {
    resolveItem: ForcedKeyResolver<Item>;
    resolve(type: AssetType.items, key: string): Item;
};

type ItemAsyncAssetResolver = {
    resolveItem: ForcedKeyResolver<Promise<Item>>;
    resolve(type: AssetType.items, key: string): Promise<Item>;
};

type RaceAssetResolver = {
    resolveRace: ForcedKeyResolver<Race>;
    resolve(type: AssetType.races, key: string): Race;
};

type RaceAsyncAssetResolver = {
    resolveRace: ForcedKeyResolver<Promise<Race>>;
    resolve(type: AssetType.races, key: string): Promise<Race>;
};

type SpellAssetResolver = {
    resolveSpell: ForcedKeyResolver<Spell>;
    resolve(type: AssetType.spells, key: string): Spell;
};

type SpellAsyncAssetResolver = {
    resolveSpell: ForcedKeyResolver<Promise<Spell>>;
    resolve(type: AssetType.spells, key: string): Promise<Spell>;
};

type SpellListAssetResolver = {
    resolveSpellList: ForcedKeyResolver<SpellList>;
    resolve(type: AssetType.spellLists, key: string): SpellList;
};

type SpellListAsyncAssetResolver = {
    resolveSpellList: ForcedKeyResolver<Promise<SpellList>>;
    resolve(type: AssetType.spellLists, key: string): Promise<SpellList>;
};

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
