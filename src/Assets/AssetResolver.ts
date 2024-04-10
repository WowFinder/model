import { AssetType } from '@wowfinder/ts-enums';
import { Debugger } from '@wowfinder/ts-utils';
import type { Adventure } from 'Adventure';
import type { Class, Race } from 'Creature';
import type { Faction } from 'Faction';
import type { Item } from 'Item';
import type { Spell, SpellList } from 'Magic';
import type {
    AdventureAsyncAssetResolver,
    AnyResolvableAsset,
    ClassAsyncAssetResolver,
    FactionAsyncAssetResolver,
    ItemAsyncAssetResolver,
    RaceAsyncAssetResolver,
    ResolvableAssetType,
    SpellAsyncAssetResolver,
    SpellListAsyncAssetResolver,
} from './base';

abstract class AsyncAssetResolver
    implements
        AdventureAsyncAssetResolver,
        ClassAsyncAssetResolver,
        FactionAsyncAssetResolver,
        ItemAsyncAssetResolver,
        RaceAsyncAssetResolver,
        SpellAsyncAssetResolver,
        SpellListAsyncAssetResolver
{
    abstract resolveAdventure(key: string): Promise<Adventure>;
    abstract resolveClass(key: string): Promise<Class>;
    abstract resolveFaction(key: string): Promise<Faction>;
    abstract resolveItem(key: string): Promise<Item>;
    abstract resolveRace(key: string): Promise<Race>;
    abstract resolveSpell(key: string): Promise<Spell>;
    abstract resolveSpellList(key: string): Promise<SpellList>;

    abstract list(type: ResolvableAssetType): Promise<string[]>;

    resolve(type: AssetType.adventures, key: string): Promise<Adventure>;
    resolve(type: AssetType.classes, key: string): Promise<Class>;
    resolve(type: AssetType.factions, key: string): Promise<Faction>;
    resolve(type: AssetType.items, key: string): Promise<Item>;
    resolve(type: AssetType.races, key: string): Promise<Race>;
    resolve(type: AssetType.spells, key: string): Promise<Spell>;
    resolve(type: AssetType.spellLists, key: string): Promise<SpellList>;

    resolve(
        type: ResolvableAssetType,
        key: string,
    ): Promise<AnyResolvableAsset> {
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

export { AsyncAssetResolver };
