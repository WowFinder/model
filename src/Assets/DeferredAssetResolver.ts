import { AssetResolver } from './AssetResolver';
import { runLoopOnce } from 'deasync';
import type { Adventure } from 'Adventure';
import type { Character } from 'Character';
import type { Class, Race } from 'Creature';
import type { Faction } from 'Faction';
import type { Item } from 'Item';
import type { Spell, SpellList } from 'Magic';

function waitForPromise<T>(promise: Promise<T>): T {
    let ret: T | undefined;
    promise.then(result => {
        ret = result;
    });
    /* eslint-disable no-unmodified-loop-condition */
    while (ret === undefined) {
        runLoopOnce();
    }
    return ret;
}

abstract class DeferredAssetResolver extends AssetResolver {
    abstract promiseResolveAdventure(key: string): Promise<Adventure>;
    abstract promiseResolveCharacter(key: string): Promise<Character>;
    abstract promiseResolveClass(key: string): Promise<Class>;
    abstract promiseResolveFaction(key: string): Promise<Faction>;
    abstract promiseResolveItem(key: string): Promise<Item>;
    abstract promiseResolveRace(key: string): Promise<Race>;
    abstract promiseResolveSpell(key: string): Promise<Spell>;
    abstract promiseResolveSpellList(key: string): Promise<SpellList>;

    resolveAdventure(key: string): Adventure {
        return waitForPromise(this.promiseResolveAdventure(key));
    }

    resolveCharacter(key: string): Character {
        return waitForPromise(this.promiseResolveCharacter(key));
    }

    resolveClass(key: string): Class {
        return waitForPromise(this.promiseResolveClass(key));
    }

    resolveFaction(key: string): Faction {
        return waitForPromise(this.promiseResolveFaction(key));
    }

    resolveItem(key: string): Item {
        return waitForPromise(this.promiseResolveItem(key));
    }

    resolveRace(key: string): Race {
        return waitForPromise(this.promiseResolveRace(key));
    }

    resolveSpell(key: string): Spell {
        return waitForPromise(this.promiseResolveSpell(key));
    }

    resolveSpellList(key: string): SpellList {
        return waitForPromise(this.promiseResolveSpellList(key));
    }
}

export { DeferredAssetResolver };
