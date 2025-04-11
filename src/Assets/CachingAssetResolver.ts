import type { Adventure } from '../Adventure';
import type { Class, Race } from '../Creature';
import type { Faction } from '../Faction';
import type { Item } from '../Item';
import type { Spell, SpellList } from '../Magic';
import { AsyncAssetResolver } from './AsyncAssetResolver';
import { ResolvableAssetType } from './base';

class AsyncCachingAssetResolver extends AsyncAssetResolver {
    backendResolver: AsyncAssetResolver;
    readonly #adventuresCache = new Map<string, Promise<Adventure>>();
    readonly #classesCache = new Map<string, Promise<Class>>();
    readonly #factionsCache = new Map<string, Promise<Faction>>();
    readonly #itemsCache = new Map<string, Promise<Item>>();
    readonly #racesCache = new Map<string, Promise<Race>>();
    readonly #spellsCache = new Map<string, Promise<Spell>>();
    readonly #spellListsCache = new Map<string, Promise<SpellList>>();

    readonly #listCache = new Map<ResolvableAssetType, Promise<string[]>>();

    constructor(backendResolver: AsyncAssetResolver) {
        super();
        this.backendResolver = backendResolver;
    }

    resolveAdventure(key: string): Promise<Adventure> {
        if (!this.#adventuresCache.has(key)) {
            this.#adventuresCache.set(
                key,
                this.backendResolver.resolveAdventure(key),
            );
        }
        return this.#adventuresCache.get(key)!;
    }

    resolveClass(key: string): Promise<Class> {
        if (!this.#classesCache.has(key)) {
            this.#classesCache.set(key, this.backendResolver.resolveClass(key));
        }
        return this.#classesCache.get(key)!;
    }

    resolveFaction(key: string): Promise<Faction> {
        if (!this.#factionsCache.has(key)) {
            this.#factionsCache.set(
                key,
                this.backendResolver.resolveFaction(key),
            );
        }
        return this.#factionsCache.get(key)!;
    }

    resolveItem(key: string): Promise<Item> {
        if (!this.#itemsCache.has(key)) {
            this.#itemsCache.set(key, this.backendResolver.resolveItem(key));
        }
        return this.#itemsCache.get(key)!;
    }

    resolveRace(key: string): Promise<Race> {
        if (!this.#racesCache.has(key)) {
            this.#racesCache.set(key, this.backendResolver.resolveRace(key));
        }
        return this.#racesCache.get(key)!;
    }

    resolveSpell(key: string): Promise<Spell> {
        if (!this.#spellsCache.has(key)) {
            this.#spellsCache.set(key, this.backendResolver.resolveSpell(key));
        }
        return this.#spellsCache.get(key)!;
    }

    resolveSpellList(key: string): Promise<SpellList> {
        if (!this.#spellListsCache.has(key)) {
            this.#spellListsCache.set(
                key,
                this.backendResolver.resolveSpellList(key),
            );
        }
        return this.#spellListsCache.get(key)!;
    }

    list(type: ResolvableAssetType): Promise<string[]> {
        if (!this.#listCache.has(type)) {
            this.#listCache.set(type, this.backendResolver.list(type));
        }
        return this.#listCache.get(type)!;
    }
}

export { AsyncCachingAssetResolver };
