import { AssetType } from '@wowfinder/ts-enums';
import { Debugger } from '@wowfinder/ts-utils';
import type { Adventure } from 'Adventure';
import type { Class, Race } from 'Creature';
import type { Faction } from 'Faction';
import type { Item } from 'Item';
import type { Spell, SpellList } from 'Magic';

import {
    AdventureAssetResolver,
    ClassAssetResolver,
    FactionAssetResolver,
    ItemAssetResolver,
    RaceAssetResolver,
    SpellListAssetResolver,
    SpellAssetResolver,
} from './base';

type ResolvableAssetType = Exclude<AssetType, AssetType.characters>;

type AnyResolvableAsset =
    | Adventure
    | Class
    | Faction
    | Item
    | Race
    | Spell
    | SpellList;
abstract class AssetResolver
    implements
        AdventureAssetResolver,
        ClassAssetResolver,
        FactionAssetResolver,
        ItemAssetResolver,
        RaceAssetResolver,
        SpellAssetResolver,
        SpellListAssetResolver
{
    abstract resolveAdventure(key: string): Adventure;
    abstract resolveClass(key: string): Class;
    abstract resolveFaction(key: string): Faction;
    abstract resolveItem(key: string): Item;
    abstract resolveRace(key: string): Race;
    abstract resolveSpell(key: string): Spell;
    abstract resolveSpellList(key: string): SpellList;

    resolve(type: AssetType.adventures, key: string): Adventure;
    resolve(type: AssetType.classes, key: string): Class;
    resolve(type: AssetType.factions, key: string): Faction;
    resolve(type: AssetType.items, key: string): Item;
    resolve(type: AssetType.races, key: string): Race;
    resolve(type: AssetType.spells, key: string): Spell;
    resolve(type: AssetType.spellLists, key: string): SpellList;

    resolve(type: ResolvableAssetType, key: string): AnyResolvableAsset {
        switch (type) {
            case AssetType.adventures:
                return this.resolveAdventure(key);
            case AssetType.classes:
                return this.resolveClass(key);
            case AssetType.factions:
                return this.resolveFaction(key);
            case AssetType.items:
                return this.resolveItem(key);
            case AssetType.races:
                return this.resolveRace(key);
            case AssetType.spellLists:
                return this.resolveSpellList(key);
            case AssetType.spells:
                return this.resolveSpell(key);
            default:
                return Debugger.unreachable(type);
        }
    }
}

export { AssetResolver };
